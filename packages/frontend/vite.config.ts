/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import vitePluginImp from 'vite-plugin-imp'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
// https://github.com/caoxiemeihao/vite-plugins/tree/main/packages/dynamic-import
import importDynamicModule from 'vite-plugin-dynamic-import-module'

const globalVendorPackages = ['react', 'react-dom', '@elastic/eui']

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log({ command, mode })
    return {
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: 'src/shared/setupTests.ts',
        },
        plugins: [
            viteCommonjs(),
            importDynamicModule(),
            react(),
            tsconfigPaths(),
            vitePluginImp({
                libList: [
                    {
                        libName: '@elastic/eui',
                        libDirectory: 'lib',
                        camel2DashComponentName: false,
                    },
                ],
            }),
        ],
        css: {
            modules: {
                localsConvention: 'camelCaseOnly',
            },
        },
        optimizeDeps: {
            esbuildOptions: {
                plugins: [esbuildCommonjs(['@elastic/eui', '@elastic/datemath'])],
            }
        },
        build: {
            dynamicImportVarsOptions: {
                exclude: [],
            },
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: globalVendorPackages,
                    },
                },
            },
        },
    }
})
