/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./public/index.html",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "register-admin":
          "url('https://www.bonparfumeur.com/cdn/shop/files/Banner-mobile_1_52255866-36f2-430b-a69f-80bda5e5ceb7_800x.jpg?v=1678197014')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
});
