module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
    plugins: [],
    // add your custom rules here
    rules: {
        'vue/html-self-closing': 0,
        'vue/html-closing-bracket-spacing': 0,
        'vue/html-closing-bracket-newline': 0,
        'space-before-function-paren': 0,
        'no-console': 0,
        'arrow-parens': 0,
        'no-useless-escape': 0,
        'vue/no-v-html': 0
    }
};
