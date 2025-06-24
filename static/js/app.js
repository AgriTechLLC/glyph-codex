// Mystical Glyph Codex - Transcendental JavaScript Application

class MysticalGlyphCodex {
    constructor() {
        this.glyphData = [];
        this.idealsData = [];
        this.filteredGlyphs = [];
        this.currentSearchTerm = '';
        this.currentCategory = '';
        this.isLoading = false;
        this.tooltip = null;
        
        // DOM Elements
        this.searchBox = document.getElementById('search-box');
        this.categoryFilter = document.getElementById('category-filter');
        this.resultsContainer = document.getElementById('results-container');
        this.tabLinks = document.querySelectorAll('.tab-link');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.copyNotification = document.getElementById('copy-notification');
        
        // Initialize the mystical experience
        this.init();
    }

    async init() {
        console.log('🔮 Awakening the ancient wisdom...');
        this.createTooltip();
        this.setupEventListeners();
        this.initializeTabs();
        await this.loadSacredData();
        this.setupKeyboardShortcuts();
        this.addMysticalEffects();
        console.log('✨ The Codex is ready to reveal its secrets!');
    }

    initializeTabs() {
        // Set initial active tab
        const activeTab = document.querySelector('.tab-link.active');
        if (activeTab) {
            const tabName = activeTab.getAttribute('data-tab');
            this.switchTab(tabName, false);
        }
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'mystical-tooltip';
        this.tooltip.style.cssText = `
            position: absolute;
            background: linear-gradient(135deg, rgba(26, 15, 46, 0.95), rgba(45, 27, 105, 0.9));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 215, 0, 0.3);
            border-radius: 15px;
            padding: 1rem;
            max-width: 350px;
            font-family: 'Crimson Text', serif;
            font-size: 0.9rem;
            color: #e8eaf6;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        `;
        document.body.appendChild(this.tooltip);
    }

    showTooltip(content, x, y) {
        this.tooltip.innerHTML = content;
        this.tooltip.style.left = `${Math.min(x, window.innerWidth - 370)}px`;
        this.tooltip.style.top = `${Math.max(y - 100, 10)}px`;
        this.tooltip.style.opacity = '1';
        this.tooltip.style.transform = 'translateY(0)';
    }

    hideTooltip() {
        this.tooltip.style.opacity = '0';
        this.tooltip.style.transform = 'translateY(10px)';
    }

    addMysticalEffects() {
        // Add cursor trail effect
        let mouseTrail = [];
        document.addEventListener('mousemove', (e) => {
            mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
            if (mouseTrail.length > 20) mouseTrail.shift();
            
            // Remove old trails
            mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
        });

        // Add mystical particle effect on scroll
        window.addEventListener('scroll', () => {
            if (Math.random() < 0.1) {
                this.createMysticalParticle();
            }
        });
    }

    createMysticalParticle() {
        const particle = document.createElement('div');
        particle.textContent = ['𓂀', '𓊨', '𓁹', '𓈖', '𓆣'][Math.floor(Math.random() * 5)];
        particle.style.cssText = `
            position: fixed;
            pointer-events: none;
            color: rgba(255, 215, 0, 0.6);
            font-size: 1.5rem;
            z-index: 1000;
            animation: mysticalFloat 3s ease-out forwards;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }

    setupEventListeners() {
        // Enhanced search with mystical debouncing
        let searchTimeout;
        this.searchBox?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch();
                this.createSearchRipple(e.target);
            }, 300);
        });

        // Category filter with divine transition
        this.categoryFilter?.addEventListener('change', () => {
            this.handleSearch();
            this.createFilterRipple();
        });

        // Transcendental tab switching
        this.tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = link.getAttribute('data-tab');
                this.switchTab(tabName);
                this.trackInteraction('tab_switch', tabName, `Entered the realm of ${tabName}`);
                this.createTabRipple(link);
            });
        });

        // Prevent form submission
        this.searchBox?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }

    createSearchRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
            transform: scale(0);
            animation: divineRipple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    createFilterRipple() {
        // Add subtle glow effect to category filter
        this.categoryFilter.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        setTimeout(() => {
            this.categoryFilter.style.boxShadow = '';
        }, 300);
    }

    createTabRipple(tab) {
        // Add energy burst effect to tab
        tab.style.transform = 'translateY(-5px) scale(1.05)';
        setTimeout(() => {
            tab.style.transform = '';
        }, 300);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search (Divine Focus)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.searchBox?.focus();
                this.showDivineMessage('🔍 Divine search activated');
            }
            
            // Escape to clear search (Cleansing)
            if (e.key === 'Escape' && document.activeElement === this.searchBox) {
                this.searchBox.value = '';
                this.handleSearch();
                this.showDivineMessage('✨ Search cleared');
            }
            
            // Tab switching with numbers (Realm Navigation)
            if (e.key >= '1' && e.key <= '4' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                const tabIndex = parseInt(e.key) - 1;
                const tabs = ['codex', 'streams', 'maat', 'alignment'];
                if (tabs[tabIndex]) {
                    this.switchTab(tabs[tabIndex]);
                    this.showDivineMessage(`🌟 Entered ${tabs[tabIndex]} realm`);
                }
            }

            // Secret konami-style code for advanced features
            this.handleSecretCode(e.key);
        });
    }

    handleSecretCode(key) {
        if (!this.secretSequence) this.secretSequence = [];
        this.secretSequence.push(key);
        if (this.secretSequence.length > 10) this.secretSequence.shift();
        
        // Secret code: "ancient" unlocks hidden features
        const secretCode = ['a', 'n', 'c', 'i', 'e', 'n', 't'];
        if (this.secretSequence.slice(-7).join('') === secretCode.join('')) {
            this.unlockHiddenFeatures();
        }
    }

    unlockHiddenFeatures() {
        this.showDivineMessage('🔓 Ancient secrets unlocked! Advanced features activated.', 5000);
        // Add special effects or hidden glyphs here
        document.body.style.filter = 'hue-rotate(20deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
    }

    switchTab(tabName, animate = true) {
        // Remove active class with mystical transition
        this.tabLinks.forEach(link => link.classList.remove('active'));
        this.tabContents.forEach(content => {
            content.classList.remove('active');
            if (animate) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(30px) scale(0.95)';
                content.style.filter = 'blur(10px)';
            }
        });
        
        // Add active class with divine manifestation
        const activeTabLink = document.querySelector(`[data-tab="${tabName}"]`);
        const activeTabContent = document.getElementById(tabName);
        
        if (activeTabLink && activeTabContent) {
            activeTabLink.classList.add('active');
            
            if (animate) {
                setTimeout(() => {
                    activeTabContent.classList.add('active');
                    activeTabContent.style.opacity = '1';
                    activeTabContent.style.transform = 'translateY(0) scale(1)';
                    activeTabContent.style.filter = 'blur(0)';
                }, 150);
            } else {
                activeTabContent.classList.add('active');
            }
        }

        // Load tab-specific sacred data
        if (tabName === 'maat' && this.idealsData.length === 0) {
            this.loadIdeals();
        }
        
        // Setup stream card interactions
        if (tabName === 'streams') {
            this.setupStreamInteractions();
        }
    }

    async loadSacredData() {
        this.showLoading('Channeling ancient wisdom...');
        try {
            await Promise.all([
                this.loadGlyphs(),
                this.loadIdeals()
            ]);
        } catch (error) {
            console.error('Error in divine transmission:', error);
            this.showError('The cosmic connection has been disrupted. Please refresh to restore the link.');
        } finally {
            this.hideLoading();
        }
    }

    async loadGlyphs() {
        try {
            console.log('📜 Summoning hieroglyphic knowledge...');
            const response = await fetch('/api/glyphs');
            if (!response.ok) throw new Error('Sacred transmission failed');
            
            this.glyphData = await response.json();
            this.filteredGlyphs = [...this.glyphData];
            
            this.populateCategoryFilter();
            this.displayGlyphs(this.glyphData);
            
            console.log(`✅ ${this.glyphData.length} sacred glyphs awakened`);
            this.showDivineMessage(`🔮 ${this.glyphData.length} ancient glyphs revealed`);
        } catch (error) {
            console.error('Error summoning glyphs:', error);
            this.showError('The glyphs remain veiled. Please try again.');
        }
    }

    populateCategoryFilter() {
        if (!this.categoryFilter) return;
        
        // Clear existing options
        this.categoryFilter.innerHTML = '<option value="">🌟 All Sacred Categories</option>';
        
        // Get unique categories with mystical names
        const categories = [...new Set(this.glyphData.map(glyph => glyph.category))]
            .filter(cat => cat && cat.trim())
            .sort();
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = `✨ ${category}`;
            this.categoryFilter.appendChild(option);
        });
    }

    displayGlyphs(glyphs) {
        if (!this.resultsContainer) return;

        if (!glyphs || glyphs.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="no-results" style="text-align: center; padding: 3rem; color: #ffd700;">
                    <div style="font-size: 4rem; margin-bottom: 1rem; animation: glyphPulse 2s ease-in-out infinite;">𓈖</div>
                    <h3 style="font-family: 'Cinzel', serif; margin-bottom: 1rem;">The Sacred Knowledge Remains Hidden</h3>
                    <p style="font-style: italic; opacity: 0.8;">Adjust your divine search or sacred filters to unveil the mysteries.</p>
                </div>
            `;
            return;
        }

        const glyphsHTML = glyphs.map((glyph, index) => {
            const symbol = glyph.unicode_char || glyph.unicode || glyph.symbol || '𓈖';
            const name = glyph.name || glyph.primary_meaning || 'Unknown Glyph';
            const transliteration = glyph.transliteration || 'Unknown';
            const meaning = glyph.primary_meaning || glyph.meaning || 'Ancient mystery';
            const category = glyph.category || 'Uncategorized';
            const mysticalSignificance = glyph.mystical_significance || 'This glyph holds ancient wisdom waiting to be discovered.';
            const interpretations = glyph.layered_interpretations || [];

            const tooltipContent = `
                <div style="font-family: 'Cinzel', serif; color: #ffd700; font-size: 1.1rem; margin-bottom: 0.5rem;">
                    ${this.escapeHtml(name)}
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #ffb300;">Transliteration:</strong> ${this.escapeHtml(transliteration)}
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #ffb300;">Sacred Category:</strong> ${this.escapeHtml(category)}
                </div>
                ${interpretations.length > 0 ? `
                    <div style="margin-bottom: 0.5rem;">
                        <strong style="color: #00e5ff;">Layered Meanings:</strong>
                        <ul style="margin: 0.5rem 0; padding-left: 1rem;">
                            ${interpretations.map(interp => `<li style="margin: 0.2rem 0;">${this.escapeHtml(interp)}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div style="border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 0.5rem; margin-top: 0.5rem; font-style: italic; color: #7c4dff;">
                    ${this.escapeHtml(mysticalSignificance)}
                </div>
            `;

            return `
                <div class="glyph-card" 
                     onclick="app.copyGlyph('${symbol}', '${this.escapeHtml(name)}')" 
                     data-tooltip='${JSON.stringify(tooltipContent).replace(/'/g, "&apos;")}'
                     style="animation-delay: ${index * 0.1}s">
                    <div class="glyph-symbol">${symbol}</div>
                    <div class="glyph-info">
                        <h3>${this.escapeHtml(name)}</h3>
                        <p><strong>Transliteration:</strong> ${this.escapeHtml(transliteration)}</p>
                        <p><strong>Meaning:</strong> ${this.escapeHtml(meaning)}</p>
                        <p><strong>Category:</strong> ${this.escapeHtml(category)}</p>
                        ${mysticalSignificance ? `
                            <div class="mystical-significance">
                                <strong>Mystical Significance:</strong> ${this.escapeHtml(mysticalSignificance)}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');

        this.resultsContainer.innerHTML = glyphsHTML;
        
        // Add tooltip listeners
        this.addTooltipListeners();
        
        // Animate cards with divine manifestation
        this.animateCardsIn();
    }

    addTooltipListeners() {
        const cards = this.resultsContainer.querySelectorAll('.glyph-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const tooltipData = e.currentTarget.getAttribute('data-tooltip');
                if (tooltipData) {
                    const content = JSON.parse(tooltipData);
                    this.showTooltip(content, e.pageX + 10, e.pageY);
                }
            });
            
            card.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            card.addEventListener('mousemove', (e) => {
                this.showTooltip(this.tooltip.innerHTML, e.pageX + 10, e.pageY);
            });
        });
    }

    animateCardsIn() {
        const cards = this.resultsContainer.querySelectorAll('.glyph-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            card.style.filter = 'blur(5px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                card.style.filter = 'blur(0)';
            }, index * 100);
        });
    }

    handleSearch() {
        const searchTerm = this.searchBox?.value.toLowerCase() || '';
        const selectedCategory = this.categoryFilter?.value || '';

        this.currentSearchTerm = searchTerm;
        this.currentCategory = selectedCategory;

        let filtered = [...this.glyphData];

        // Divine search through sacred knowledge
        if (searchTerm) {
            filtered = filtered.filter(glyph => {
                const searchableFields = [
                    glyph.name,
                    glyph.primary_meaning,
                    glyph.meaning,
                    glyph.transliteration,
                    glyph.category,
                    glyph.mystical_significance,
                    ...(glyph.layered_interpretations || [])
                ].filter(Boolean);

                return searchableFields.some(field => 
                    field.toLowerCase().includes(searchTerm)
                );
            });
            
            // Track sacred search
            this.trackInteraction('glyph_search', searchTerm, `Sought wisdom: ${searchTerm}`, 
                filtered.map(g => g.unicode_char || g.symbol));
        }

        // Filter by sacred category
        if (selectedCategory) {
            filtered = filtered.filter(glyph => glyph.category === selectedCategory);
        }

        this.filteredGlyphs = filtered;
        this.displayGlyphs(filtered);
        
        // Show search results message
        if (searchTerm) {
            this.showDivineMessage(`🔍 Found ${filtered.length} sacred glyphs`);
        }
    }

    copyGlyph(symbol, name) {
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(symbol);
            return;
        }

        navigator.clipboard.writeText(symbol).then(() => {
            this.showCopyNotification(`✨ ${name} copied to the ethereal realm!`);
            this.trackInteraction('glyph_copy', symbol, `Captured sacred symbol: ${name}`, [symbol]);
            this.createCopyRipple();
        }).catch(err => {
            console.error('Divine copy failed: ', err);
            this.fallbackCopyTextToClipboard(symbol);
        });
    }

    createCopyRipple() {
        // Create mystical ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: divineExpand 1s ease-out forwards;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }

    showCopyNotification(message = '✨ Copied to the cosmic clipboard!') {
        if (!this.copyNotification) return;

        this.copyNotification.innerHTML = message;
        this.copyNotification.style.display = 'block';
        this.copyNotification.style.opacity = '1';
        
        // Clear any existing timeout
        if (this.copyNotificationTimeout) {
            clearTimeout(this.copyNotificationTimeout);
        }
        
        this.copyNotificationTimeout = setTimeout(() => {
            this.copyNotification.style.opacity = '0';
            setTimeout(() => {
                this.copyNotification.style.display = 'none';
            }, 300);
        }, 3000);
    }

    showDivineMessage(message, duration = 2000) {
        const divineMsg = document.createElement('div');
        divineMsg.innerHTML = message;
        divineMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(26, 15, 46, 0.95), rgba(45, 27, 105, 0.9));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 215, 0, 0.5);
            border-radius: 25px;
            padding: 1rem 2rem;
            color: #ffd700;
            font-family: 'Cinzel', serif;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
            animation: divineAppear 0.5s ease-out;
        `;
        
        document.body.appendChild(divineMsg);
        
        setTimeout(() => {
            divineMsg.style.opacity = '0';
            divineMsg.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                if (divineMsg.parentNode) {
                    divineMsg.parentNode.removeChild(divineMsg);
                }
            }, 300);
        }, duration);
    }

    showLoading(message = 'Channeling ancient wisdom...') {
        if (!this.resultsContainer) return;
        
        this.isLoading = true;
        this.resultsContainer.innerHTML = `
            <div class="loading">
                <span>${message}</span>
                <div style="margin-top: 1rem; font-size: 2rem; animation: glyphPulse 2s ease-in-out infinite;">𓂀 𓊨 𓁹</div>
            </div>
        `;
    }

    hideLoading() {
        this.isLoading = false;
    }

    showError(message) {
        if (!this.resultsContainer) return;
        
        this.resultsContainer.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 3rem; color: #ff6b6b;">
                <div style="font-size: 3rem; margin-bottom: 1rem; color: #ffd700;">𓊃</div>
                <h3 style="font-family: 'Cinzel', serif; margin-bottom: 1rem;">Sacred Transmission Interrupted</h3>
                <p style="font-style: italic;">${message}</p>
            </div>
        `;
    }

    async loadIdeals() {
        try {
            console.log('🕊️ Awakening the principles of Ma\'at...');
            const response = await fetch('/api/ideals');
            if (!response.ok) throw new Error('Ma\'at\'s wisdom remains veiled');
            
            this.idealsData = await response.json();
            this.setupIdealsInteraction();
            
            console.log(`✅ ${this.idealsData.length} sacred ideals illuminated`);
        } catch (error) {
            console.error('Error awakening ideals:', error);
        }
    }

    setupIdealsInteraction() {
        const idealsList = document.querySelectorAll('.ideals-list li');
        idealsList.forEach((ideal, index) => {
            // Remove existing event listeners by cloning
            ideal.replaceWith(ideal.cloneNode(true));
        });

        // Re-select and add enhanced interactions
        const newIdealsList = document.querySelectorAll('.ideals-list li');
        newIdealsList.forEach((ideal, index) => {
            ideal.addEventListener('click', () => {
                const idealText = ideal.textContent;
                this.copyIdeal(idealText);
                this.trackInteraction('ideal_click', idealText, `Embraced the principle: ${idealText}`, []);
                this.createIdealRipple(ideal);
            });
            
            // Enhanced visual feedback
            ideal.style.cursor = 'pointer';
            ideal.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)';
            
            // Add mystical hover effects
            ideal.addEventListener('mouseenter', () => {
                ideal.style.transform = 'translateX(15px) scale(1.02)';
                ideal.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.4)';
            });
            
            ideal.addEventListener('mouseleave', () => {
                ideal.style.transform = '';
                ideal.style.boxShadow = '';
            });
        });
    }

    setupStreamInteractions() {
        const streamCards = document.querySelectorAll('.stream-card');
        streamCards.forEach((card, index) => {
            // Remove existing event listeners by cloning
            card.replaceWith(card.cloneNode(true));
        });

        // Re-select and add enhanced interactions
        const newStreamCards = document.querySelectorAll('.stream-card');
        newStreamCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const glyphText = card.querySelector('.stream-glyphs').textContent;
                const translationText = card.querySelector('.stream-translation').textContent;
                this.copyStream(glyphText, translationText);
                this.trackInteraction('stream_copy', glyphText, `Copied sacred stream: ${translationText}`, []);
                this.createStreamRipple(card);
            });
            
            // Enhanced visual feedback
            card.style.cursor = 'pointer';
            card.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)';
        });
    }

    copyStream(glyphText, translationText) {
        const streamContent = `${glyphText}\n\n"${translationText}"`;
        
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(streamContent);
            return;
        }

        navigator.clipboard.writeText(streamContent).then(() => {
            this.showCopyNotification('🌊 Sacred stream copied to the ethereal realm!');
            this.createCopyRipple();
        }).catch(err => {
            console.error('Failed to copy stream: ', err);
            this.fallbackCopyTextToClipboard(streamContent);
        });
    }

    createStreamRipple(card) {
        // Add sacred energy ripple to clicked stream
        card.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(124, 77, 255, 0.3))';
        card.style.borderColor = '#00e5ff';
        
        setTimeout(() => {
            card.style.background = '';
            card.style.borderColor = '';
        }, 600);
    }

    createIdealRipple(ideal) {
        // Add sacred energy ripple to clicked ideal
        ideal.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(124, 77, 255, 0.3))';
        ideal.style.borderLeftColor = '#00e5ff';
        
        setTimeout(() => {
            ideal.style.background = '';
            ideal.style.borderLeftColor = '';
        }, 600);
    }

    copyIdeal(idealText) {
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(idealText);
            return;
        }

        navigator.clipboard.writeText(idealText).then(() => {
            this.showCopyNotification('🕊️ Sacred principle copied to your heart!');
            this.createCopyRipple();
        }).catch(err => {
            console.error('Failed to copy principle: ', err);
            this.fallbackCopyTextToClipboard(idealText);
        });
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.cssText = "position: fixed; top: 0; left: 0; opacity: 0;";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            this.showCopyNotification('✨ Sacred knowledge preserved!');
        } catch (err) {
            console.error('Backup copy method failed', err);
        }

        document.body.removeChild(textArea);
    }

    async trackInteraction(actionType, userInput, systemResponse, relatedGlyphs) {
        try {
            await fetch('/api/log_interaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action_type: actionType,
                    user_input: userInput,
                    system_response: systemResponse,
                    related_glyphs: relatedGlyphs || [],
                    context_summary: `Seeker performed ${actionType} in the mystical realm`
                })
            });
        } catch (error) {
            console.error('Error recording sacred interaction:', error);
        }
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text ? text.replace(/[&<>"']/g, m => map[m]) : '';
    }

    // Public mystical API
    divineSearch(term) {
        if (this.searchBox) {
            this.searchBox.value = term;
            this.handleSearch();
            this.showDivineMessage(`🔍 Seeking: ${term}`);
        }
    }

    clearDivineSearch() {
        if (this.searchBox) {
            this.searchBox.value = '';
            this.handleSearch();
            this.showDivineMessage('✨ Search purified');
        }
    }

    enterSacredRealm(category) {
        if (this.categoryFilter) {
            this.categoryFilter.value = category;
            this.handleSearch();
            this.showDivineMessage(`🌟 Entered realm: ${category}`);
        }
    }

    getSacredStatistics() {
        return {
            totalGlyphs: this.glyphData.length,
            filteredGlyphs: this.filteredGlyphs.length,
            totalIdeals: this.idealsData.length,
            currentSearch: this.currentSearchTerm,
            currentRealm: this.currentCategory,
            categories: [...new Set(this.glyphData.map(g => g.category))].length
        };
    }
}

// Add mystical CSS animations
const mysticalStyles = document.createElement('style');
mysticalStyles.textContent = `
    @keyframes mysticalFloat {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
        50% { transform: translateY(-50vh) rotate(180deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes divineRipple {
        to { transform: scale(4); opacity: 0; }
    }
    
    @keyframes divineExpand {
        to { transform: translate(-50%, -50%) scale(50); opacity: 0; }
    }
    
    @keyframes divineAppear {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(mysticalStyles);

// Initialize the mystical application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MysticalGlyphCodex();
    
    // Make the sacred codex globally accessible
    window.glyphCodex = app;
    window.mysticApp = app; // Alternative access
});

// Handle cosmic visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && app) {
        console.log('🌟 The seeker returns to the sacred realm...');
        app.showDivineMessage('🌟 Welcome back, seeker of wisdom');
    }
});

// Sacred error handling
window.addEventListener('error', (e) => {
    console.error('🔥 Cosmic disturbance detected:', e.error);
    if (app) {
        app.showDivineMessage('⚡ The cosmic forces have shifted. Refresh to restore harmony.', 5000);
    }
});

// Mystical performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.fetchStart;
            console.log(`🚀 Sacred realm manifested in ${loadTime}ms`);
            
            if (app && loadTime < 2000) {
                app.showDivineMessage('⚡ Swift divine manifestation achieved!', 2000);
            }
        }, 100);
    });
}