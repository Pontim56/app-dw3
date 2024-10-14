import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        '10/100': '10%',
        '20/100': '20%',
        '25/100': '25%',
        '30/100': '30%',
        '33/100': '33%',
        '37/100': '37%',
        '40/100': '40%',
        '43/100': '43%',
        '47/100': '47%',
        '50/100': '50%',
        '55/100': '55%',
        '60/100': '60%',
        '1500px': '1500px',
      },
      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

          
      },
    },
  },
  plugins: [],
};
export default config;
