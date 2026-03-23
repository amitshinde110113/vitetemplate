/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        neutral: {
          dark: 'var(--color-neutral-dark)',
          medium: 'var(--color-neutral-medium)',
          light: 'var(--color-neutral-light)',
        },
        primary: {
          DEFAULT: 'var(--color-primary-bold)',
          bold: 'var(--color-primary-bold)',
          muted: 'var(--color-primary-muted)',
        },
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        yellow: 'var(--color-yellow)',
      },
      fontFamily: {
        sans: 'var(--font-family-base)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        DEFAULT: 'var(--border-radius-md)',
        md: 'var(--border-radius-md)',
        lg: 'var(--border-radius-lg)',
      },
      boxShadow: {
        sm: 'var(--box-shadow-sm)',
        DEFAULT: 'var(--box-shadow-md)',
        md: 'var(--box-shadow-md)',
        lg: 'var(--box-shadow-lg)',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '250ms',
        normal: '250ms',
        slow: '350ms',
        bounce: '400ms',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
