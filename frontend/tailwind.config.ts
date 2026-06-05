import type { Config } from 'tailwindcss';

export default {
    content: ['./index.html', './src/**/*.{vue,ts}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1A5C38',
                    medium: '#2E7D4F',
                    light: '#D6EAD8',
                },
                surface: '#FFFFFF',
                ink: '#333333',
                divider: '#E8E8E8',
                warning: '#F59E0B',
                danger: '#DC2626',
                success: '#16A34A',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config;
