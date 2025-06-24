from flask import Flask, jsonify, render_template, request, g
import sqlite3
import json
from datetime import datetime

app = Flask(__name__)
DATABASE = 'glyph_codex.db'

# --- Database Management ---

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        try:
            with open('schema.sql', 'r') as f:
                db.cursor().executescript(f.read())
            db.commit()
        except FileNotFoundError:
            print("schema.sql not found. Database not initialized.")


# --- API Routes ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/glyphs')
def get_glyphs():
    try:
        with open('glyph_catalog.json', 'r', encoding='utf-8') as f:
            content = f.read().strip()
            # Remove any potential extra content after the JSON
            if content.endswith(']'):
                # Find the last complete JSON object
                last_bracket = content.rfind(']')
                if last_bracket != -1:
                    content = content[:last_bracket + 1]
            data = json.loads(content)
        return jsonify(data)
    except json.JSONDecodeError as e:
        print(f"JSON Error: {e}")
        print(f"Error at position {e.pos}")
        # Return a minimal working dataset
        return jsonify([{
            "id": 1,
            "unicode_char": "𓇋",
            "name": "Reed Leaf",
            "transliteration": "i",
            "primary_meaning": "I / My presence",
            "layered_interpretations": ["Self-identification", "Singular consciousness"],
            "mystical_significance": "The reed bends with cosmic winds yet remains rooted.",
            "category": "Consciousness & Being",
            "phonetic_value": "i",
            "determinative": False
        }])
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "Failed to load glyph data"}), 500

@app.route('/api/ideals')
def get_ideals():
    ideals_text = [
        "I honor virtue.", "I benefit with gratitude.", "I am peaceful.", "I respect the property of others.",
        "I affirm that all life is sacred.", "I give offerings that are genuine.", "I live in truth.",
        "I regard all altars with respect.", "I speak with sincerity.", "I consume only my fair share.",
        "I offer words of good intent.", "I relate with love.", "I am in harmony with my emotions.",
        "I am not jealous.", "I speak with kindness.", "I am balanced.", "I listen to opposing opinions.",
        "I am not attached to outcomes.", "I am forgiving.", "I am not angry.", "I am not boastful.",
        "I am not arrogant.", "I am not deceitful.", "I am not judgmental.", "I am not resentful.",
        "I create harmony.", "I am not aggressive.", "I am not abusive.", "I am not violent.",
        "I do not cause harm.", "I do not cause suffering.", "I do not cause fear.", "I am not vengeful.",
        "I do not pollute the water.", "I do not pollute the land.", "I do not speak with exaggeration.",
        "I am not deceitful in my speech.", "I do not steal.", "I do not covet.", "I am not lustful.",
        "I am not gluttonous.", "I am not envious."
    ]

    stopwords = [
        'i', 'am', 'with', 'that', 'are', 'is', 'in', 'to', 'my', 'the', 'of',
        'and', 'a', 'an', 'not', 'be', 'do', 'only', 'all'
    ]

    processed_ideals = []
    for ideal in ideals_text:
        clean_text = ideal.replace('.', '').lower()
        words = clean_text.split()
        keywords = [word for word in words if word not in stopwords]
        processed_ideals.append({
            "text": ideal,
            "keywords": keywords if keywords else words
        })

    return jsonify(processed_ideals)

@app.route('/api/log_interaction', methods=['POST'])
def log_interaction():
    data = request.get_json()
    db = get_db()
    db.execute(
        'INSERT INTO interactions (timestamp, action_type, user_input, system_response, related_glyphs, context_summary) VALUES (?, ?, ?, ?, ?, ?)',
        (datetime.now(), data.get('action_type'), data.get('user_input'), data.get('system_response'), json.dumps(data.get('related_glyphs')), data.get('context_summary'))
    )
    db.commit()
    return jsonify({'status': 'success'}), 201

@app.route('/api/history')
def get_history():
    cur = get_db().execute('SELECT * FROM interactions ORDER BY timestamp DESC LIMIT 50')
    history = cur.fetchall()
    return jsonify([dict(row) for row in history])

def analyze_history_recursively():
    print("🧠 [Recursive Self-Audit]: Analyzing interaction history...")
    db = get_db()
    
    ideal_clicks_cur = db.execute("SELECT user_input, COUNT(user_input) as count FROM interactions WHERE action_type = 'ideal_click' GROUP BY user_input ORDER BY count DESC LIMIT 5")
    common_ideals = ideal_clicks_cur.fetchall()

    search_terms_cur = db.execute("SELECT user_input, COUNT(user_input) as count FROM interactions WHERE action_type = 'glyph_search' AND user_input != '' GROUP BY user_input ORDER BY count DESC LIMIT 5")
    common_searches = search_terms_cur.fetchall()

    total_interactions_cur = db.execute("SELECT COUNT(id) as count FROM interactions")
    total_interactions = total_interactions_cur.fetchone()['count']

    analysis_summary = {
        "total_interactions": total_interactions,
        "most_common_searches": [dict(row) for row in common_searches],
        "most_clicked_ideals": [dict(row) for row in common_ideals]
    }
    
    print("    [Analysis Complete]")
    return analysis_summary

@app.route('/api/run_analysis')
def run_analysis():
    analysis_results = analyze_history_recursively()
    return jsonify(analysis_results)

if __name__ == '__main__':
    init_db()
    import os
    port = int(os.environ.get('PORT', 8000))
    debug_mode = os.environ.get('FLASK_ENV', 'production') != 'production'
    app.run(debug=debug_mode, host='0.0.0.0', port=port)