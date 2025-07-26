// Myco MIDI Web Synth V3 - JavaScript Implementation
// Focused on accessibility and clear, readable code

class MycoSynth {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.oscillators = new Map();
        this.volume = 0.5;
        this.waveform = 'sine';
        
        this.init();
    }

    async init() {
        try {
            // Initialize Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.setValueAtTime(this.volume, this.audioContext.currentTime);

            this.setupEventListeners();
            console.log('Myco Synth initialized successfully');
        } catch (error) {
            console.error('Failed to initialize audio context:', error);
            this.showError('Audio not supported in this browser');
        }
    }

    setupEventListeners() {
        // Volume control
        const volumeSlider = document.getElementById('volume');
        const volumeDisplay = document.getElementById('volume-display');
        
        volumeSlider.addEventListener('input', (e) => {
            this.volume = e.target.value / 100;
            volumeDisplay.textContent = `${e.target.value}%`;
            if (this.masterGain) {
                this.masterGain.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
            }
        });

        // Waveform selection
        const waveformSelect = document.getElementById('waveform');
        waveformSelect.addEventListener('change', (e) => {
            this.waveform = e.target.value;
        });

        // Test tone button
        const testButton = document.getElementById('test-tone');
        testButton.addEventListener('click', () => {
            this.playTestTone();
        });

        // Virtual keyboard
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            // Mouse events
            key.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.playNote(key);
            });
            
            key.addEventListener('mouseup', (e) => {
                e.preventDefault();
                this.stopNote(key);
            });

            key.addEventListener('mouseleave', (e) => {
                this.stopNote(key);
            });

            // Touch events for mobile
            key.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.playNote(key);
            });

            key.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.stopNote(key);
            });

            // Keyboard events
            key.addEventListener('keydown', (e) => {
                if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault();
                    this.playNote(key);
                }
            });

            key.addEventListener('keyup', (e) => {
                if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault();
                    this.stopNote(key);
                }
            });

            // Make keys focusable for accessibility
            key.setAttribute('tabindex', '0');
            key.setAttribute('role', 'button');
            key.setAttribute('aria-label', `Play note ${key.dataset.note}`);
        });

        // Computer keyboard mapping
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e, true);
        });

        document.addEventListener('keyup', (e) => {
            this.handleKeyboardInput(e, false);
        });
    }

    handleKeyboardInput(event, isKeyDown) {
        // Map computer keyboard to piano keys
        const keyMap = {
            'KeyA': 'C4',
            'KeyW': 'C#4',
            'KeyS': 'D4',
            'KeyE': 'D#4',
            'KeyD': 'E4',
            'KeyF': 'F4',
            'KeyT': 'F#4',
            'KeyG': 'G4',
            'KeyY': 'G#4',
            'KeyH': 'A4',
            'KeyU': 'A#4',
            'KeyJ': 'B4'
        };

        const note = keyMap[event.code];
        if (note) {
            event.preventDefault();
            const keyElement = document.querySelector(`[data-note="${note}"]`);
            if (keyElement) {
                if (isKeyDown && !this.oscillators.has(note)) {
                    this.playNote(keyElement);
                } else if (!isKeyDown) {
                    this.stopNote(keyElement);
                }
            }
        }
    }

    async playNote(keyElement) {
        if (!this.audioContext) {
            await this.resumeAudioContext();
        }

        const note = keyElement.dataset.note;
        const frequency = parseFloat(keyElement.dataset.freq);

        // Don't play if already playing
        if (this.oscillators.has(note)) {
            return;
        }

        try {
            // Create oscillator and gain for this note
            const oscillator = this.audioContext.createOscillator();
            const noteGain = this.audioContext.createGain();

            // Configure oscillator
            oscillator.type = this.waveform;
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

            // Configure envelope (ADSR)
            const now = this.audioContext.currentTime;
            noteGain.gain.setValueAtTime(0, now);
            noteGain.gain.linearRampToValueAtTime(0.3, now + 0.01); // Attack
            noteGain.gain.exponentialRampToValueAtTime(0.2, now + 0.1); // Decay to sustain

            // Connect audio graph
            oscillator.connect(noteGain);
            noteGain.connect(this.masterGain);

            // Start oscillator
            oscillator.start(now);

            // Store references
            this.oscillators.set(note, { oscillator, noteGain });

            // Visual feedback
            keyElement.classList.add('playing');

            console.log(`Playing note: ${note} at ${frequency}Hz`);
        } catch (error) {
            console.error('Error playing note:', error);
        }
    }

    stopNote(keyElement) {
        const note = keyElement.dataset.note;
        const noteData = this.oscillators.get(note);

        if (noteData) {
            try {
                // Release envelope
                const now = this.audioContext.currentTime;
                noteData.noteGain.gain.cancelScheduledValues(now);
                noteData.noteGain.gain.setValueAtTime(noteData.noteGain.gain.value, now);
                noteData.noteGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

                // Stop oscillator after release
                noteData.oscillator.stop(now + 0.1);

                // Clean up
                this.oscillators.delete(note);

                // Remove visual feedback
                keyElement.classList.remove('playing');

                console.log(`Stopped note: ${note}`);
            } catch (error) {
                console.error('Error stopping note:', error);
                // Force cleanup on error
                this.oscillators.delete(note);
                keyElement.classList.remove('playing');
            }
        }
    }

    async playTestTone() {
        if (!this.audioContext) {
            await this.resumeAudioContext();
        }

        const testKey = document.querySelector('[data-note="A4"]');
        if (testKey) {
            this.playNote(testKey);
            
            // Auto-stop after 1 second
            setTimeout(() => {
                this.stopNote(testKey);
            }, 1000);
        }
    }

    async resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
                console.log('Audio context resumed');
            } catch (error) {
                console.error('Failed to resume audio context:', error);
            }
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 1rem;
            border-radius: 6px;
            z-index: 1000;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Initialize the synthesizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Myco MIDI Web Synth V3...');
    new MycoSynth();
});

// Add instructions for keyboard controls
document.addEventListener('DOMContentLoaded', () => {
    const docs = document.querySelector('.docs');
    if (docs) {
        const keyboardInfo = document.createElement('div');
        keyboardInfo.innerHTML = `
            <h3>Keyboard Controls</h3>
            <p>You can also play notes using your computer keyboard:</p>
            <ul>
                <li><strong>A S D F G H J</strong> - White keys (C D E F G A B)</li>
                <li><strong>W E T Y U</strong> - Black keys (C# D# F# G# A#)</li>
            </ul>
        `;
        docs.appendChild(keyboardInfo);
    }
});