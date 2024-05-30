import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['ethers'],
      plugins: [
        nodeResolve({
          browser: true,
          preferBuiltins: true
        }),
        commonjs(),
      ],
    },
  },
  optimizeDeps: {
    include: ['ethers'],
  },
});
