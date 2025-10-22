/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        teal: '#1d9a89', // main accent color
        mint: '#99b6ad', // complementary color based on user preferences
        gold: "#DAA520",
        ivory: '#F8F7F2',
        olive: '#4B830D',
        green:"#67726e",
        cream: '#F7F6F2',
        coral: '#FF6F61',
        darkcoral:'#E45B53', 
        charcoal: '#333333',

        'gray-800': '#2d3748', // dark gray for contrast text
        'gray-50': '#f9fafb', // light gray for backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // modern sans-serif for readability
      },
      container: {
        center: true,
        padding: '1rem',
      },
      spacing: {
        18: '4.5rem', // additional spacing for layout consistency
      },
      borderRadius: {
        'xl': '1rem', // larger rounded corners for buttons and cards
        'full': '9999px', // fully rounded elements for circular buttons, images
      },
      transitionProperty: {
        colors: 'background-color, border-color, color, fill, stroke',
      },
      boxShadow: {
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)', // subtle shadow for depth
      },
    },
          /*
    colors: {

      black: '#101820',
      ivory: '#F8F7F2',
      olive: '#4B830D',
      mint: '#A6E4C8',
      peach: '#FFD1B9',
      charcoal: '#333333',
      white: "#F5F5F5",
      grey: "#CECFC7",
      beige: "#F8F8F8",
      gold: "#DAA520",
      black: "#36454F",
      darkgreen: "#3e513f",
      green:"#67726e",
      //mint:"#537970",
     // olive:"#6B8E23",
      coral: "#FF6F61",
      darkcoral:"#E45B53" 
    },
    extend: {}, */
  },
  plugins: [],
};
