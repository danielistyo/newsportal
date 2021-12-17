// Styles
import '@mdi/font/css/materialdesignicons.css';
// eslint-disable-next-line import/extensions
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';
import { ThemeDefinition } from 'vuetify/dist/vuetify';

const CustomTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#3f51b5',
    secondary: '#2196f3',
    accent: '#03a9f4',
    error: '#f44336',
    warning: '#ffc107',
    info: '#00bcd4',
    success: '#4caf50',
  },
  variables: {
    'border-color': '#FFFFFF',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'activated-opacity': 0.12,
    'idle-opacity': 0.1,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'dragged-opacity': 0.08,
    'pressed-opacity': 0.16,
    'kbd-background-color': '#212529',
    'kbd-color': '#FFFFFF',
    'code-background-color': '#B7B7B7',
  },
};
export default createVuetify({
  theme: {
    defaultTheme: 'CustomTheme',
    themes: { CustomTheme },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
