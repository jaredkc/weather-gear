import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /from-(blue|cyan|lime|yellow|orange|red)-500/,
    },
    {
      pattern: /to-(blue|cyan|lime|yellow|orange|red)-500/,
    },
  ],
  theme: {
    fontFamily: {
      sans: [
        'Roboto',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
      ],
      serif: [
        'ui-serif',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
      ],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
