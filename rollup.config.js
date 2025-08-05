import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

const external = ['react', 'react-dom', 'react/jsx-runtime'];

const baseConfig = {
  external,
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
    }),
  ],
};

export default [
  // Main bundle (core + react)
  {
    ...baseConfig,
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },

  // React-only bundle
  {
    ...baseConfig,
    input: 'src/react.ts',
    output: [
      {
        file: 'dist/react.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/react.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },

  // Core-only bundle (no React)
  {
    ...baseConfig,
    external: [], // No externals for core-only
    input: 'src/core.ts',
    output: [
      {
        file: 'dist/core.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/core.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },

  // Type definitions
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
    external,
  },

  // React type definitions
  {
    input: 'src/react.ts',
    output: {
      file: 'dist/react.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
    external,
  },

  // Core type definitions
  {
    input: 'src/core.ts',
    output: {
      file: 'dist/core.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
    external: [],
  },
];