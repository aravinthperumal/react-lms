import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            components: '/src/components',
            pages: '/src/pages',
            globals: '/src/globals',
            utils: '/src/utils',
            _state: '/src/_state',
        },
    },
    server: {
        port: 5000,
        open: true,
    },
});
