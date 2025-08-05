// Core exports (framework agnostic)
export { createGlitch, glitch, GlitchEngine } from './core/core';

// Type exports
export type {
  GlitchOptions,
  GlitchConfig,
  GlitchCallbacks,
  GlitchInstance,
  CharacterSet,
  TriggerType,
  IntensityLevel,
  TimingFunction,
  VisualEffects,
  AnimationState
} from './types/types';

// Utility exports
export {
  CHARACTER_SETS,
  TIMING_FUNCTIONS,
  INTENSITY_PRESETS,
  getCharacterSet,
  getTimingFunction,
  getIntensityPreset,
  prefersReducedMotion
} from './utils/utils';