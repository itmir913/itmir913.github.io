import plugin from 'tailwindcss/plugin.js';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.js'],
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Pretendard Variable"', 'Pretendard', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
            },
            colors: {
                paper: '#fbfbfd',
                ink: '#1d1d1f',
                night: '#08090f',
                // Per-section palettes. Keys match section ids; night holds the dark-mode values.
                work: { bg: '#eef2ff', ink: '#202a55', orb: '#b8c9ff', accent: '#5e70d8', night: { bg: '#0c1024', ink: '#e2e6ff', orb: '#26326e', accent: '#8e9cff' } },
                archive: { bg: '#f8f0e9', ink: '#452b20', orb: '#ffd0ae', accent: '#bb5227', night: { bg: '#170e09', ink: '#fbe5d8', orb: '#5c3018', accent: '#ff9a66' } },
            },
            transitionTimingFunction: {
                brand: 'cubic-bezier(.16,1,.3,1)'
            },
            keyframes: {
                drift: {
                    '0%': { transform: 'translate3d(-1%,0,0) scale(1)' },
                    '100%': { transform: 'translate3d(2%,-2%,0) scale(1.06)' }
                }
            },
            animation: {
                drift: 'drift 18s ease-in-out infinite alternate'
            }
        }
    },
    plugins: [
        // [data-tone=<id>] for every section palette: background, text, --orb and --accent, light and dark.
        // Section ids are only known at runtime, so this keys off an attribute the content scan never drops.
        plugin(({ addBase, theme }) => {
            const tones = {};
            for (const [k, c] of Object.entries(theme('colors'))) {
                if (!c || typeof c !== 'object' || !c.night) continue;
                const set = p => ({ backgroundColor: p.bg, color: p.ink, '--orb': p.orb, '--accent': p.accent });
                tones[`[data-tone="${k}"]`] = set(c);
                tones[`[data-theme="dark"] [data-tone="${k}"]`] = set(c.night);
            }
            addBase(tones);
        })
    ]
};
