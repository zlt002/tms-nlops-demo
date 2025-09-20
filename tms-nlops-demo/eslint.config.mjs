import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'prisma/generated/**',
      'prisma/seed.ts',
      'scripts/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      'jest.config.js',
      'jest.setup.js',
      '__tests__/**',
      'tests/**',
    ],
  },
  {
    rules: {
      // React 规则
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-unescaped-entities': 'off',

      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'off',

      // 通用规则
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': 'error',
      'no-trailing-spaces': 'error',
    },
  },
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]

export default eslintConfig
