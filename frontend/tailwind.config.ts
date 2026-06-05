import type { Config } from 'tailwindcss';

/**
 * CannaSYS — Tailwind theme
 * Mirrors the CSS variables in theme.css. Single brand accent (teal),
 * disciplined neutrals, Apple-inspired restraint.
 */
export default {
    content: ['./index.html', './src/**/*.{vue,ts}'],
    theme: {
        extend: {
            colors: {
                /* Brand */
                primary: {
                    DEFAULT: '#026874',
                    hover:   '#015560',
                    active:  '#013D44',
                    soft:    '#E6F2F3',
                    50:      '#F0F7F8',
                    100:     '#D6EAEC',
                    200:     '#AAD4D9',
                    300:     '#6FAFB7',
                    400:     '#3D8C95',
                    500:     '#026874',
                    600:     '#015560',
                    700:     '#01464F',
                    800:     '#013740',
                    900:     '#062E2D',
                },
                accent:   { DEFAULT: '#75A38C' },
                mulberry: { DEFAULT: '#4C1041' },

                /* Neutrals */
                background:     '#FAFAFA',
                surface:        '#FFFFFF',
                'surface-muted':  '#F4F4F5',
                'surface-sunken': '#EFEFEF',

                /* Text */
                text: {
                    primary:   '#18181B',
                    secondary: '#52525B',
                    tertiary:  '#71717A',
                    disabled:  '#A1A1AA',
                },
                border: {
                    DEFAULT: '#E4E4E7',
                    strong:  '#D4D4D8',
                },

                /* Semantic */
                success: '#16A34A',
                warning: '#D97706',
                error:   '#DC2626',
                info:    '#0284C7',
            },
            fontFamily: {
                sans: [
                    'Inter', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"',
                    '"Segoe UI"', 'system-ui', 'sans-serif',
                ],
                display: ['Amaranth', 'Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                input: '10px',
                button: '10px',
                card: '20px',
                'card-lg': '28px',
                modal: '24px',
                panel: '32px',
            },
            boxShadow: {
                xs: '0 1px 2px rgba(24, 24, 27, 0.04)',
                sm: '0 1px 3px rgba(24, 24, 27, 0.06), 0 1px 2px rgba(24, 24, 27, 0.04)',
                md: '0 4px 12px rgba(24, 24, 27, 0.06), 0 2px 4px rgba(24, 24, 27, 0.04)',
                lg: '0 12px 32px rgba(24, 24, 27, 0.08), 0 4px 8px rgba(24, 24, 27, 0.04)',
            },
            spacing: {
                // Spacing scale 4/8/12/16/24/32/48/64 already in Tailwind defaults.
            },
        },
    },
    plugins: [],
} satisfies Config;
