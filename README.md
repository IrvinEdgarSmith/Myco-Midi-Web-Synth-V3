# Myco MIDI Web Synth V3

A simple, accessible web-based MIDI synthesizer built with modern web technologies. This project emphasizes clear, readable code and accessible user interfaces following community best practices.

## Features

### Core Functionality
- **Real-time audio synthesis** using Web Audio API
- **Virtual keyboard interface** with visual feedback
- **Multiple waveform types** (sine, square, sawtooth, triangle)
- **Volume control** with real-time adjustment
- **Computer keyboard support** for note input
- **Mobile-friendly touch interface**

### Accessibility Features
- **Keyboard navigation** support for all controls
- **Screen reader compatibility** with proper ARIA labels
- **High contrast visual design** for better visibility
- **Responsive layout** that works on all device sizes
- **Clear documentation** with progressive information disclosure

## Quick Start

1. **Open the synthesizer**: Navigate to `index.html` in your web browser
2. **Test functionality**: Visit `test.html` to run basic functionality tests
3. **Play notes**: Click the virtual keyboard or use your computer keyboard
4. **Adjust settings**: Use the volume slider and waveform selector

## Usage Guide

### Virtual Keyboard
- Click any key to play the corresponding musical note
- Keys show one octave starting from middle C (C4)
- Visual feedback shows which keys are currently playing

### Computer Keyboard Controls
- **White keys**: A S D F G H J (plays C D E F G A B)
- **Black keys**: W E T Y U (plays C# D# F# G# A#)
- Hold keys to sustain notes, release to stop

### Audio Controls
- **Volume**: Adjust overall output level (0-100%)
- **Waveform**: Choose between sine, square, sawtooth, or triangle waves
- **Test Tone**: Plays a reference A4 note at 440Hz

## Technical Implementation

### Architecture
- **Pure JavaScript** implementation with no external dependencies
- **Web Audio API** for real-time audio synthesis
- **CSS Grid** and **Flexbox** for responsive layout
- **Progressive enhancement** for broad browser compatibility

### Browser Compatibility
- **Chrome/Chromium** 66+ (recommended)
- **Firefox** 60+
- **Safari** 11.1+
- **Edge** 79+

*Note: Requires Web Audio API support for audio functionality*

## File Structure

```
├── index.html      # Main synthesizer interface
├── styles.css      # Styling and responsive design
├── synth.js        # Synthesizer logic and audio processing
├── test.html       # Functionality test suite
└── README.md       # This documentation
```

## Development Principles

This project follows community-driven development practices:

### Code Quality
- **Readable code** with clear variable names and comments
- **Modular architecture** for easy maintenance and extension
- **Error handling** with user-friendly feedback
- **Performance optimization** for smooth real-time audio

### User Experience
- **Accessible design** following WCAG guidelines
- **Intuitive interface** with clear visual hierarchy
- **Responsive behavior** across different devices
- **Progressive disclosure** of information and features

### Documentation
- **Clear instructions** using everyday language
- **Step-by-step guides** for common tasks
- **Technical details** organized by complexity level
- **Community-friendly** explanations avoiding unnecessary jargon

## Testing

### Automated Tests
Run the test suite by opening `test.html` in your browser:
- **Audio Context Test**: Verifies Web Audio API support
- **Oscillator Test**: Tests waveform generation
- **Frequency Test**: Validates musical note accuracy
- **Volume Control Test**: Checks volume range functionality
- **Integration Test**: Comprehensive functionality check

### Manual Testing
1. Open `index.html` in a supported browser
2. Test audio output with the "Test Tone" button
3. Verify keyboard input (both virtual and computer keyboard)
4. Check volume and waveform controls
5. Test on different screen sizes and devices

## Contributing

### Getting Started
1. Clone or download the repository
2. Open files in your preferred code editor
3. Test changes using the provided test suite
4. Follow the existing code style and documentation patterns

### Code Style
- Use descriptive variable and function names
- Include comments for complex logic
- Maintain consistent indentation and formatting
- Write self-documenting code where possible

## License

This project is open source and available for educational and personal use.

## Support

For questions or issues:
1. Check the test suite (`test.html`) for common problems
2. Review browser console for error messages  
3. Ensure your browser supports Web Audio API
4. Try refreshing the page to reset audio context

---

*Built with accessibility and community knowledge in mind, following best practices for web audio development.*