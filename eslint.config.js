import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', '@it-incubator/eslint-config'),
  {
    files: ['**/*.test.{js,ts,jsx,tsx}', '**/__tests__/**/*.{js,ts,jsx,tsx}'],
    extends: ['plugin:vitest/recommended'], // Подключаем только Vitest
    env: {
      'vitest-globals/env': true, // Поддержка глобальных переменных Vitest
    },
    rules: {
      'vitest/no-disabled-tests': 'warn', // Предупреждать о test.skip
      'vitest/no-focused-tests': 'error', // Запрещать test.only
      'vitest/no-identical-title': 'error', // Не допускать одинаковые названия тестов
      'vitest/prefer-to-be': 'warn', // Предупреждать о использовании `expect(x).toBe(true)`
    },
  },
];

export default eslintConfig;
module.exports = eslintConfig;