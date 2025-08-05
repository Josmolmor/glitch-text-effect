// Core-only exports (no React dependencies)
export { createGlitch, glitch, GlitchEngine } from './core/core';
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
export {
  CHARACTER_SETS,
  TIMING_FUNCTIONS,
  INTENSITY_PRESETS,
  getCharacterSet,
  getTimingFunction,
  getIntensityPreset,
  prefersReducedMotion
} from './utils/utils';