import type React from 'react';

/**
 * Character sets for glitch effect randomization
 */
export type CharacterSet = 'letters' | 'numbers' | 'symbols' | 'alphanumeric' | 'all';

/**
 * Animation trigger types
 */
export type TriggerType = 'hover' | 'click' | 'intersection' | 'manual';

/**
 * Intensity levels for glitch effect
 */
export type IntensityLevel = 'low' | 'medium' | 'high';

/**
 * Timing function types
 */
export type TimingFunction = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | ((_progress: number) => number);

/**
 * Color shift configuration
 */
export interface ColorShiftConfig {
  /** Enable color shifting */
  enabled: boolean;
  /** Array of hex colors to cycle through */
  colors?: string[];
  /** Animation speed multiplier */
  speed?: number;
}

/**
 * Visual effects that can be applied during glitch
 */
export interface VisualEffects {
  shake?: boolean;
  flicker?: boolean;
  colorShift?: boolean | ColorShiftConfig;
  scalePulse?: boolean;
}

/**
 * Core configuration options for glitch effect
 */
export interface GlitchOptions {
  /** Source text to transform from */
  from: string;
  
  /** Target text to transform to */
  to: string;
  
  /** Animation duration in milliseconds (100-5000) */
  duration?: number;
  
  /** How the animation is triggered */
  trigger?: TriggerType;
  
  /** Intensity of the glitch effect */
  intensity?: IntensityLevel;
  
  /** Character sets to use for randomization */
  characters?: CharacterSet | string;
  
  /** Animation timing function */
  timing?: TimingFunction;
  
  /** Rate at which characters are revealed (0-1) */
  revealRate?: number;
  
  /** Frequency of character randomization (0-1) */
  glitchRate?: number;
  
  /** Visual effects to apply */
  effects?: VisualEffects;
  
  /** Respect user's reduced motion preference */
  respectReducedMotion?: boolean;
  
  /** Custom CSS classes to apply */
  className?: string;
}

/**
 * Animation lifecycle callbacks
 */
export interface GlitchCallbacks {
  onStart?: () => void;
  onProgress?: (_progressValue: number) => void;
  onComplete?: () => void;
}

/**
 * Complete glitch configuration
 */
export interface GlitchConfig extends GlitchOptions, GlitchCallbacks {}

/**
 * Intensity preset configuration
 */
export type IntensityPreset = Partial<Pick<GlitchOptions, 'duration' | 'revealRate' | 'glitchRate' | 'effects'>>;

/**
 * Internal animation state
 */
export interface AnimationState {
  isRunning: boolean;
  startTime: number;
  currentText: string;
  revealedIndices: Set<number>;
  animationId?: number;
}

/**
 * Glitch instance interface
 */
export interface GlitchInstance {
  start: () => void;
  stop: () => void;
  reset: () => void;
  isRunning: () => boolean;
  destroy: () => void;
}

/**
 * React component props
 */
export interface GlitchTextProps extends Omit<GlitchConfig, 'trigger'> {
  /** HTML element type to render */
  as?: keyof JSX.IntrinsicElements;
  
  /** How the animation is triggered */
  trigger?: TriggerType;
  
  /** CSS class name */
  className?: string;
  
  /** Children content */
  children?: React.ReactNode;
}