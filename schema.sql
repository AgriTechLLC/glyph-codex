DROP TABLE IF EXISTS interactions;

CREATE TABLE interactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp DATETIME NOT NULL,
  action_type TEXT NOT NULL,
  user_input TEXT,
  system_response TEXT,
  related_glyphs TEXT,
  context_summary TEXT
); 