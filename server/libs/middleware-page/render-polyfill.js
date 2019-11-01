/**
 * Created by Jackie.Wu on 2018/8/3.
 */
module.exports = (() => {
  require('@babel/register')({
    presets: [["@babel/env", {
      "targets": {
        "browsers": "last 2 Chrome versions",
        "node": "current"
      }
    }], '@babel/react'],
    plugins: [
      "add-module-exports",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-function-bind",

      "@babel/plugin-syntax-export-default-from",

      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-logical-assignment-operators",
      [
        "@babel/plugin-proposal-optional-chaining",
        {"loose": false}
      ],
      [
        "@babel/plugin-proposal-pipeline-operator",
        {"proposal": "minimal"}
      ],
      [
        "@babel/plugin-proposal-nullish-coalescing-operator",
        {"loose": false}
      ],
      "@babel/plugin-proposal-do-expressions",


      [
        "@babel/plugin-proposal-decorators",
        {"legacy": true}
      ],
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-throw-expressions",

      "@babel/plugin-syntax-import-meta",
      [
        "@babel/plugin-proposal-class-properties",
        {"loose": true}
      ],
      "@babel/plugin-proposal-json-strings",

      "@babel/plugin-transform-react-constant-elements",
      "@babel/plugin-transform-react-inline-elements",
      "babel-plugin-transform-react-remove-prop-types",

      "@babel/plugin-syntax-dynamic-import",
      [
        "babel-plugin-import",
        {
          "libraryName": "antd",
          "libraryDirectory": "lib",
          "style": true
        }
      ]
    ],

  });

  require('css-modules-require-hook')({
    extensions: ['.css', '.less'],
    processorOpts: {parser: require('postcss-less').parse}
  });

  // Image require hook
  require('asset-require-hook')({
    name: '/[hash].[ext]',
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit: 8000
  });

  require('react');

})();
