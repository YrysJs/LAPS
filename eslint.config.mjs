// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'indent': ['error', 2],

    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: []
    }],

    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',    
          normal: 'never', 
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],

    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: 1
    }],

    'vue/multiline-html-element-content-newline': ['error', {
      allowEmptyLines: true
    }],

    'vue/singleline-html-element-content-newline': 'off'
  }
})

