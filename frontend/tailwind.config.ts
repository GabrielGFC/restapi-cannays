import type { Config } from 'tailwindcss';

export default {
    content: ['./index.html', './src/**/*.{vue,ts}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#026874',
                    dark: '#062E2D',
                    medium: '#2E7D4F',
                    light: '#D6EAD8',
                },
                accent: {
                    DEFAULT: '#75A38C',
                    dark: '#4A1B3D',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    alt: '#F7F7F7',
                    bg: '#F1F1F1',
                },
                ink: {
                    DEFAULT: '#062E2D',
                    soft: 'rgba(0,0,0,0.55)',
                    mute: 'rgba(0,0,0,0.45)',
                },
                divider: '#E8E8E8',
                warning: '#F59E0B',
                danger: '#B3261E',
                success: '#16A34A',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Amaranth', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                pill: '40px',
            },
            boxShadow: {
                card: '0 4px 24px rgba(0,0,0,0.12)',
                field: '0 4px 4px rgba(0,0,0,0.12)',
                btn: '0 4px 8px rgba(0,0,0,0.15)',
            },
        },
    },
    plugins: [],
} satisfies Config;
