module.exports = {
  'parserOptions': {
    "project": ["./tsconfig.json"],
    "ecmaVersion": "ES2021",
    "sourceType": "module",
    "tsconfigRootDir": __dirname,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "tsx": true,
    }
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended", // https://typescript-eslint.io/linting/typed-linting/monorepos#one-tsconfigjson-per-package-and-an-optional-one-in-the-root
    "plugin:@typescript-eslint/recommended-type-checked", // https://typescript-eslint.io/linting/configs#recommended-type-checked
    "plugin:@typescript-eslint/strict", // https://typescript-eslint.io/linting/configs#strict
    "plugin:@typescript-eslint/strict-type-checked", // https://typescript-eslint.io/linting/configs/#strict-type-checked
    // "prettier",
  ],
  "plugins": [
    "react",
    "react-hooks",
    "eslint-plugin-react",
    "@typescript-eslint",
    "@stylistic",
    "@stylistic/js",
    "@stylistic/eslint-plugin-ts",
    "@stylistic/jsx",
    "@stylistic/eslint-plugin-plus",
    '@stylistic/ts'
  ],
  "rules": {
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "import/no-unresolved": [2, { "ignore": ['^@'] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "quotes": "off",
    // укзываем расширение файлов?
    "import/extensions": [
      "error",
      'ignorePackages',
      {
        "ts": "never",

      }
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error", {
      ignoreTypeValueShadow: true,
      ignoreFunctionTypeParameterNameValueShadow: true
    }],
    "@typescript-eslint/space-before-function-paren": "off",
    // пробел перед скобкой именованной, анонимной футнкции и прочее
    "@stylistic/space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
    }],
    "no-new": "off",
    "no-new-wrappers": "off",
    "@typescript-eslint/strict-boolean-exarticleions": "off",
    "@typescript-eslint/semi": "off",
    "semi": ["error", "always"],
    "@stylistic/semi": ["error", "always", { "omitLastInOneLineBlock": true }],
    "semi-spacing": ["error", { "before": false, "after": true }],
    "@stylistic/semi-style": ["error", "last"],
    "@typescript-eslint/semi": "off",
    "react/display-name": "off",
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
    // '@stylistic/ts/indent': ['error', 2, { "ignoredNodes": ["ConditionalExarticleion"] }],
    "@typescript-eslint/no-explicit-any": ["error", { fixToUnknown: false, ignoreRestArgs: true }],
    "@typescript-eslint/no-var-requires": "off",
    // ключевое слово при импорте
    "@typescript-eslint/consistent-type-imports": "off",
    // if else for, while, &&, || and ?:
    "@typescript-eslint/no-unnecessary-condition": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/await-thenable": "off",
    // Запретить использование неиспользуемых переменных
    "@typescript-eslint/no-unused-vars": "off",
    // "no-extraneous-dependencies": "off", //
    // Запретить присваивание значений с типом any переменным и свойствам.
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off", // Запретить вызов значения с типом any.
    "@stylistic/ts/member-delimiter-style": [ // TypeScript - три разделителя между элементами в интерфейсах и псевдонимах типов
      "error", {
        "multiline": {
          "delimiter": "none", // ' ' ',' ';'
          "requireLast": false // последняя строка
        }
      }
    ],
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": "off",

    "@typescript-eslint/prefer-nullish-coalescing": "off", //["error", { ignoreTernaryTests: true }]

  },
  "ignorePatterns": [
    "webpack.config.js",
    "postcss.config.js",
    "/*eslintrc.js",
    "/moneys/src/index.ts",
    "babel.config.js",
    "dist/",
    "monyes/src/**/interfaces.ts",
    "monyes/src/index.ts",

  ],


}
