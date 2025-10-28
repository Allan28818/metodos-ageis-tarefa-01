import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Possíveis erros
      "no-console": "off", // Permitir console.log em Node.js
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Melhores práticas
      eqeqeq: ["error", "always"], // Usar === e !== sempre
      curly: ["error", "all"], // Sempre usar chaves em blocos
      "no-var": "error", // Não usar var
      "prefer-const": "warn", // Preferir const quando possível
      "prefer-arrow-callback": "warn", // Preferir arrow functions

      // Estilo de código
      indent: ["error", 2], // Indentação de 2 espaços
      quotes: ["error", "double", { avoidEscape: true }], // Aspas simples
      semi: ["error", "always"], // Ponto e vírgula obrigatório
      "comma-dangle": ["error", "always-multiline"], // Vírgula final em objetos/arrays multilinhas
      "object-curly-spacing": ["error", "always"], // Espaços em objetos { }
      "array-bracket-spacing": ["error", "never"], // Sem espaços em arrays []
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],

      // ES6+
      "arrow-spacing": "error", // Espaços em arrow functions
      "no-duplicate-imports": "error", // Não duplicar imports
      "prefer-template": "warn", // Preferir template strings

      // Async/Await
      "no-async-promise-executor": "error",
      "require-await": "warn",
    },
  },
  {
    // Ignorar arquivos e diretórios
    ignores: ["node_modules/", "coverage/", "dist/", "build/"],
  },
];
