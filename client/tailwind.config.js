module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontSize: {
      xxxs: '0.6rem',
      xxs: '0.65rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif'],
        wixMadeForDisplay: ['var(--font-wix-made-for-display)', 'sans-serif'],
        establish: ['var(--font-establishRetrosansOTF)', 'sans-serif'],
        seriflLight: ['var(--font-NotoSerifLight)', 'serif'],
        serifMedium: ['var(--font-NotoSerifMedium)', 'serif'],
        serifBold: ['var(--font-NotoSerifBold)', 'serif'],
        sansLight: ['var(--font-NotoSansLight)', 'sans-serif'],
        sansMedium: ['var(--font-NotoSansMedium)', 'sans-serif'],
        sansBold: ['var(--font-NotoSansBold)', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
