module.exports = {
    '*.{js,jsx,ts,tsx}': ["ng-lint-staged lint --fix --"],
    "*.(html|scss|json)": ["prettier --write"]
};