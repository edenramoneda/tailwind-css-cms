module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  //  "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        'xs': {'max' : '640px'},
        'xxs':{'max' : '375px'}
      }
    },
  },
  plugins: [
  ],
//  darkMode: "class"
}

