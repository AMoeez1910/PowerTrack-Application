module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"], // Only lint JS and TS files
      rules: {
        "prettier/prettier": [
          "error",
          {
            endOfLine: "none",
          },
        ],
      },
    },
  ],
};
