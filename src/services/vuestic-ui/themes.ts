import { ref, computed } from "vue"
import { mergeGlobalConfig } from 'vuestic-ui'

export const THEME_NAMES = {
  LIGHT: 'LIGHT',
  ORIGINAL: 'ORIGINAL',
  DARK: 'DARK',
  SEMI_DARK: 'SEMI_DARK',
}

export const COLOR_THEMES = [
  {
    name: THEME_NAMES.LIGHT,
    colors: {
      primary: '#6b9a69',
      secondary: '#e3ce9c',
      background: '#f6f7f6',
      success: '#4dc257',
      info: '#0396df',
      danger: '#e06a71',
      warning: '#f9f871',
      white: '#ffffff',
      dark: '#262824',
      gray: '#767c88',

      darkGreen: '#4d7b4c',
      baseGreen: '#6b9a69',
      semiGreen: '#97b896',
      lightGreen: '#d2e0d2',
      baseSecondary: '#e3ce9c',
      semiSecondary: '#ebdcb9',
      lightSecondary: '#f6f0e1',
      baseGray: '#878787',
      semiGray: '#ababab',
      lightGray: '#dbdbdb',
      gray1Light: '#e3e3e3',
      gray1Dark: '#6b6b6b',
      gray2Dark: '#4f4f4f',
    },
    components: {
      VaNavbar: {
        color: 'white',
        textColor: 'dark',
      },
      VaSidebar: {
        color: 'white',
        textColor: 'dark',
      },
      VaCard: {
        color: 'white',
      },
      VaCardContent: {
        textColor: 'dark',
      },
      VaCardTitle: {
        textColor: 'dark',
      }
    }
  },
  {
    name: THEME_NAMES.DARK,
    colors: {
      primary: '#6F92DA',
      secondary: '#A8AEBA',
      background: '#2f302d',
      success: '#3d9209',
      info: '#2c82e0',
      danger: '#e42222',
      warning: '#ffd43a',
      white: '#262824',
      dark: '#ffffff',
      gray: '#f6f7f6',
    },
    components: {
      VaNavbar: {
        color: 'white',
        textColor: 'dark',
      },
      VaSidebar: {
        color: 'white',
        textColor: 'dark',
      },
      VaCard: {
        color: 'white',
      },
      VaCardContent: {
        textColor: 'dark',
      },
      VaCardTitle: {
        textColor: 'dark',
      }
    }
  },
  {
    name: THEME_NAMES.SEMI_DARK,
    colors: {
      primary: '#6F92DA',
      secondary: '#A8AEBA',
      success: '#3d9209',
      info: '#2c82e0',
      danger: '#e42222',
      warning: '#ffd43a',
      background: '#f6f7f6',
      white: '#ffffff',
      dark: '#262824',
      gray: '#767c88',
    },
    components: {
      VaNavbar: {
        color: 'dark',
        textColor: 'white',
      },
      VaSidebar: {
        color: 'dark',
        textColor: 'white',
      },
      VaCard: {
        color: 'white',
      },
      VaCardContent: {
        textColor: 'dark',
      },
      VaCardTitle: {
        textColor: 'dark',
      }
    }
  },
  {
    name: THEME_NAMES.ORIGINAL,
    colors: {
      primary: '#6EDC7D',
      secondary: '#A8AEBA',
      background: '#eeeeee',
      success: '#76E18D',
      info: '#2c82e0',
      danger: '#e34b4a',
      warning: '#ffc200',
      gray: '#767c88',
      white: '#ffffff',
      dark: '#262824',
    },
    components: {
      VaNavbar: {
        color: '#1E4CBD',
        textColor: 'primary',
      },
      VaSidebar: {
        color: '#0A2E80',
        textColor: 'primary',
      },
      VaCard: {
        color: 'widget',
      },
      VaCardContent: {
        textColor: 'dark',
      },
      VaCardTitle: {
        textColor: 'dark',
      }
    }
  },
]

export const useTheme = () => {
  const themeNameRef = ref(THEME_NAMES.LIGHT)

  const setTheme = (themeName: keyof typeof THEME_NAMES) => {
    themeNameRef.value = themeName
    const theme = COLOR_THEMES.find((theme) => theme.name === themeName)

    if (!theme) { throw new Error('Theme not found') }

    mergeGlobalConfig({ colors: theme.colors as any, components: theme.components })
  }

  const theme = computed(() =>  COLOR_THEMES.find((theme) => theme.name === themeNameRef.value))
  
  return { setTheme, themeName: themeNameRef, theme }
}