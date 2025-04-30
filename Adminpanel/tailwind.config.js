/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src//*.{html,js}",
    "./public/*.html",
  ],
  theme: {
    extend: {
      placeholderStyles: {
        'center': {
          textAlign: 'center',
        },
        'italic-gray': {
          color: '#718096',
          fontStyle: 'italic',
        },
        // Add more custom placeholder styles as needed
      },
    },
  },
plugins:[],
}