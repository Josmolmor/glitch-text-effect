// React-specific exports
export { GlitchText, useGlitchText } from './react/react';
export type { GlitchTextProps } from './types/types';

// Re-export core functionality for convenience
export { createGlitch, glitch } from './core/core';
export type {
  GlitchOptions,
  GlitchConfig,
  GlitchInstance,
  CharacterSet,
  TriggerType,
  IntensityLevel,
  TimingFunction,
  VisualEffects
} from './types/types';