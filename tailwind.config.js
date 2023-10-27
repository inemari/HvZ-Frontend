module.exports = {
  // Define the content that this configuration applies to, including JS, JSX, and HTML files.
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    // Extend the default Tailwind CSS theme with custom colors and fonts.
    extend: {
      colors: {
        customOrange: '#AE5C2E',
        customGreen: '#525437',
        customWhite: '#FFFFFF',
        customLightOrange: 'hsl(25, 19%, 86%)',
        customBrown: '#3D3D3D',
        customDarkOrange: '#914E27',
        customLightBrown: '#555',
      },
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
  },
  plugins: [
    // Other plugins can be added here if needed.
  ],
};
