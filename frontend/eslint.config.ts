import vue from 'eslint-plugin-vue';

export default [
    ...vue.configs['flat/recommended'],
    {
        files: ['**/*.{ts,vue}'],
        languageOptions: {
            parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-multiple-template-root': 'off',
        },
    },
    { ignores: ['dist/**', 'node_modules/**', 'src/components.d.ts', 'src/auto-imports.d.ts'] },
];
