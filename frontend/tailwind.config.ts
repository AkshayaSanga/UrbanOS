import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], theme: { extend: { colors: { mvbg: "#020617", mvcard: "#0F172A", mvborder: "#1E293B", mvtext: "#E5E7EB", mvmuted: "#94A3B8", mvblue: "#38BDF8", mvgreen: "#22C55E", mvorange: "#F97316", mvred: "#EF4444" } } }, plugins: [] };
export default config;
