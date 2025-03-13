import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                "roboto": ["roboto", "sans-serif"],
                "roboto-light": ["roboto-light", "sans-serif"],
                "roboto-medium": ["roboto-medium", "sans-serif"],
                "roboto-bold": ["roboto-bold", "sans-serif"],
                "roboto-thin": ["roboto-thin", "sans-serif"],
                "roboto-italic": ["roboto-italic", "sans-serif"],
            },
            colors: {
                "irchad-orange": {
                    DEFAULT: "#FF8B00",
                },
                "irchad-white": {
                    DEFAULT: "#F7F8FA",
                },
                "irchad-gray": {
                    DEFAULT: "#2E2E2E",
                    dark: "#1E1E1E",
                    light : "#959595",
                },
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
};
export default config;
