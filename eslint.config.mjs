import codemaskConfig from 'eslint-config-codemask'

/**
 * @type {Array<import('eslint').Linter.FlatConfig>}
 */
export default [
    ...codemaskConfig,
    {
        rules: {
            '@typescript-eslint/comma-dangle': 'off',
            'functional/immutable-data': 'off',
            '@typescript-eslint/ban-types': 'off',
            'no-shadow': 'off',
            'functional/functional-parameters': 'off',
            'import/order': 'off',
            'react/no-children-prop': 'off',
            'react/hook-use-state': 'off',
            '@typescript-eslint/naming-convention': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/indent': 'off',
        },
    },
]
