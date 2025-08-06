import React, { useState } from 'react';
import { GlitchText, useGlitchText } from 'glitch-text-effect/react';

// Basic examples
function BasicExamples() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Basic Examples</h2>
      
      {/* Hover Effect */}
      <div className="example">
        <h3 className="text-lg font-semibold mb-2">Hover Effect</h3>
        <GlitchText
          from="Hover over me!"
          to="Glitched!"
          trigger="hover"
          className="text-2xl font-bold cursor-pointer hover:text-green-400"
        />
      </div>
      
      {/* Click Effect */}
      <div className="example">
        <h3 className="text-lg font-semibold mb-2">Click Effect</h3>
        <GlitchText
          from="Click me!"
          to="Clicked!"
          trigger="click"
          className="text-2xl font-bold cursor-pointer text-blue-400"
        />
      </div>
      
      {/* Intersection Observer */}
      <div className="example">
        <h3 className="text-lg font-semibold mb-2">Scroll Into View</h3>
        <GlitchText
          from="Scroll to reveal"
          to="I'm visible!"
          trigger="intersection"
          className="text-2xl font-bold text-purple-400"
        />
      </div>
    </div>
  );
}

// Manual control example
function ManualControlExample() {
  const [progress, setProgress] = useState(0);
  
  const glitch = useGlitchText({
    from: 'Manual Control',
    to: 'Controlled!',
    duration: 2000,
    intensity: 'high',
    onProgress: (p) => setProgress(Math.round(p * 100))
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Manual Control</h2>
      <div className="text-2xl font-bold" ref={glitch.ref}>
        Manual Control
      </div>
      <div className="flex gap-2">
        <button 
          onClick={glitch.start}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start
        </button>
        <button 
          onClick={glitch.reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
      <div className="text-sm text-gray-600">Progress: {progress}%</div>
    </div>
  );
}

// Intensity comparison
function IntensityComparison() {
  const intensities = ['low', 'medium', 'high'] as const;
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Intensity Levels</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {intensities.map((intensity) => (
          <div key={intensity} className="text-center p-4 border rounded">
            <div className="text-sm font-semibold mb-2 uppercase">{intensity}</div>
            <GlitchText
              from="Intensity"
              to="Demo"
              trigger="hover"
              intensity={intensity}
              className="text-xl font-bold cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Character set examples
function CharacterSetExamples() {
  const characterSets = [
    { name: 'Letters', type: 'letters' as const, from: 'Hello', to: 'World' },
    { name: 'Numbers', type: 'numbers' as const, from: '12345', to: '67890' },
    { name: 'Symbols', type: 'symbols' as const, from: '!@#$%', to: '^&*()' },
    { name: 'All', type: 'all' as const, from: 'Mixed', to: 'Ch4r5!' },
  ];
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Character Sets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {characterSets.map(({ name, type, from, to }) => (
          <div key={name} className="p-4 border rounded">
            <div className="text-sm font-semibold mb-2">{name}</div>
            <GlitchText
              from={from}
              to={to}
              trigger="hover"
              characters={type}
              className="text-lg font-mono cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Visual effects showcase
function VisualEffectsShowcase() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Visual Effects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <div className="text-sm font-semibold mb-2">Shake Only</div>
          <GlitchText
            from="Shake"
            to="Effect"
            trigger="hover"
            effects={{ shake: true }}
            className="text-lg font-bold cursor-pointer"
          />
        </div>
        
        <div className="p-4 border rounded">
          <div className="text-sm font-semibold mb-2">Flicker Only</div>
          <GlitchText
            from="Flicker"
            to="Effect"
            trigger="hover"
            effects={{ flicker: true }}
            className="text-lg font-bold cursor-pointer"
          />
        </div>
        
        <div className="p-4 border rounded">
          <div className="text-sm font-semibold mb-2">Color Shift</div>
          <GlitchText
            from="Color"
            to="Shift"
            trigger="hover"
            effects={{ colorShift: true }}
            className="text-lg font-bold cursor-pointer"
          />
        </div>
        
        <div className="p-4 border rounded">
          <div className="text-sm font-semibold mb-2">Custom Color Shift</div>
          <GlitchText
            from="Custom Colors"
            to="Rainbow!"
            trigger="hover"
            effects={{ 
              colorShift: {
                enabled: true,
                colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'],
                speed: 2
              }
            }}
            className="text-lg font-bold cursor-pointer"
          />
        </div>

        <div className="p-4 border rounded">
          <div className="text-sm font-semibold mb-2">All Effects</div>
          <GlitchText
            from="Chaos"
            to="Mode"
            trigger="hover"
            effects={{ shake: true, flicker: true, colorShift: true, scalePulse: true }}
            className="text-lg font-bold cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

// Main app component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-4">Glitch Text Effect</h1>
          <p className="text-gray-400">React Component Examples</p>
        </header>
        
        <BasicExamples />
        <ManualControlExample />
        <IntensityComparison />
        <CharacterSetExamples />
        <VisualEffectsShowcase />
      </div>
    </div>
  );
}