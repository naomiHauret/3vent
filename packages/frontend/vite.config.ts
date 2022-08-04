import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import path from 'path'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@abis': path.resolve(__dirname, './src/abis'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@graphql': path.resolve(__dirname, './src/graphql'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      'tailwind.config.js': path.resolve(__dirname, './tailwind.config.js'),
    },
  },
  optimizeDeps: {
    include: ['tailwind.config.js'],
  },
})
