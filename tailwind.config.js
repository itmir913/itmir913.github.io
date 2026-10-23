import plugin from 'tailwindcss/plugin.js';

/** @type {import('tailwindcss').Config} */
export default {
    // Apply hover only on devices that can hover (mouse); on touch it would stick after a tap.
    future: { hoverOnlyWhenSupported: true },
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
                work: { bg: '#e9f6f6', ink: '#10393f', orb: '#9fe0dc', accent: '#12838c', night: { bg: '#061619', ink: '#d6f4f2', orb: '#134a4c', accent: '#5fd6cf' } },
                archive: { bg: '#f8f3e6', ink: '#3f3216', orb: '#f3d68c', accent: '#a8741a', night: { bg: '#15110a', ink: '#f6ead0', orb: '#5a4517', accent: '#f0c35c' } },
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
