# Glitch Text Effect

A lightweight, customizable glitch text effect library with zero dependencies. Framework-agnostic core with React wrapper.

[![npm version](https://badge.fury.io/js/glitch-text-effect.svg)](https://badge.fury.io/js/glitch-text-effect)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/glitch-text-effect)](https://bundlephobia.com/package/glitch-text-effect)
[![TypeScript](https://badgen.net/badge/TypeScript/included/blue)](https://www.typescriptlang.org/)

## ✨ Features

- 🪶 **Lightweight**: < 3KB gzipped, zero dependencies
- 🎯 **Framework Agnostic**: Works with React, Vue, Svelte, or vanilla JS
- 🔧 **Highly Customizable**: Multiple trigger types, intensity levels, and effects
- 📱 **Accessible**: Respects `prefers-reduced-motion`
- 🎨 **Multiple Triggers**: Hover, click, intersection observer, or manual control
- ⚡ **Performance First**: RAF-based animations, no DOM thrashing
- 🏗️ **Tree Shakeable**: Import only what you need
- 📦 **TypeScript**: Full type definitions included

## 🚀 Installation

```bash
npm install glitch-text-effect
```

## 📖 Quick Start

### React

```jsx
import { GlitchText } from 'glitch-text-effect/react';

function App() {
  return (
    <GlitchText 
      from="Hello World" 
      to="Glitch Effect!" 
      trigger="hover"
      className="text-2xl font-bold"
    />
  );
}
```

### Vanilla JavaScript

```js
import { glitch } from 'glitch-text-effect';

const element = document.querySelector('#my-text');
glitch(element, {
  from: 'Hello World',
  to: 'Glitch Effect!',
  duration: 1000,
  trigger: 'hover'
});
```

## 🎛️ Configuration Options

### Core Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `from` | `string` | **required** | Source text to transform from |
| `to` | `string` | **required** | Target text to transform to |
| `duration` | `number` | `1200` | Animation duration in milliseconds |
| `trigger` | `'hover' \| 'click' \| 'intersection' \| 'manual'` | `'hover'` | How the animation is triggered |
| `intensity` | `'low' \| 'medium' \| 'high'` | `'medium'` | Intensity of the glitch effect |

### Advanced Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `characters` | `CharacterSet \| string` | `'letters'` | Character sets for randomization |
| `timing` | `TimingFunction` | `'easeOut'` | Animation timing function |
| `revealRate` | `number` | `0.5` | Rate at which characters are revealed (0-1) |
| `glitchRate` | `number` | `0.6` | Frequency of character randomization (0-1) |
| `effects` | `VisualEffects` | `{}` | Visual effects to apply |
| `respectReducedMotion` | `boolean` | `true` | Respect user's motion preferences |

## 🎨 Character Sets

- `letters` - A-Z, a-z
- `numbers` - 0-9  
- `symbols` - Special characters (!@#$%^&*)
- `alphanumeric` - Letters + numbers
- `all` - Everything combined
- Custom string - Use your own characters

## ⚡ Trigger Types

### Hover
```jsx
<GlitchText from="Hover me" to="Glitched!" trigger="hover" />
```

### Click
```jsx
<GlitchText from="Click me" to="Clicked!" trigger="click" />
```

### Intersection Observer
```jsx
<GlitchText from="Scroll to me" to="I'm visible!" trigger="intersection" />
```

### Manual Control
```jsx
import { useGlitchText } from 'glitch-text-effect/react';

function ManualExample() {
  const glitch = useGlitchText({
    from: 'Manual',
    to: 'Control!'
  });

  return (
    <div>
      <span ref={glitch.ref}>Manual</span>
      <button onClick={glitch.start}>Start</button>
      <button onClick={glitch.reset}>Reset</button>
    </div>
  );
}
```

## 🎭 Visual Effects

```jsx
<GlitchText
  from="Effects"
  to="Awesome!"
  effects={{
    shake: true,        // Subtle trembling
    flicker: true,      // Opacity variation
    colorShift: true,   // Hue rotation
    scalePulse: true    // Size pulsing
  }}
/>
```

## 🏗️ Vanilla JavaScript API

### Simple Usage
```js
import { glitch } from 'glitch-text-effect';

// Promise-based
await glitch(element, { from: 'Hello', to: 'World' });

// With callbacks
glitch(element, {
  from: 'Hello',
  to: 'World',
  onStart: () => console.log('Started'),
  onComplete: () => console.log('Done')
});
```

### Advanced Usage
```js
import { createGlitch } from 'glitch-text-effect';

const instance = createGlitch(element, {
  from: 'Hello',
  to: 'World',
  duration: 2000,
  intensity: 'high'
});

// Control manually
instance.start();
instance.stop();
instance.reset();
instance.destroy();
```

## 📦 Bundle Optimization

Import only what you need:

```js
// React only
import { GlitchText } from 'glitch-text-effect/react';

// Vanilla JS only
import { glitch } from 'glitch-text-effect/core';

// Everything
import { GlitchText, glitch } from 'glitch-text-effect';
```

## 🎯 TypeScript

Full TypeScript support with comprehensive type definitions:

```tsx
import type { GlitchConfig, IntensityLevel } from 'glitch-text-effect';

const config: GlitchConfig = {
  from: 'Typed',
  to: 'Safe!',
  intensity: 'high' as IntensityLevel,
  effects: {
    shake: true,
    colorShift: true
  }
};
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📄 License

MIT © [Jose Maria Molina](https://github.com/your-username)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Examples

Check out the [examples directory](./examples) for more usage patterns and integrations.

---

Made with ❤️ by [Jose Maria Molina](https://molina.digital)