export { ErrorBoundary } from 'expo-router';
import 'src/i18n/Intl';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as React from 'react';
import AppProvider from './_app';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TypesafeI18n from 'src/i18n/i18n-react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import ReduxProvider from 'src/redux/store/ReduxProvider';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <NativeBaseProvider isSSR={false}>
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="register" />
          </Stack>
        </ThemeProvider>
      </NativeBaseProvider>
    </I18nextProvider>
  );
}

function RootLayoutNav() {
  return (
    <ReduxProvider>
      <TypesafeI18n locale="th">
        <AppProvider>
          <App />
        </AppProvider>
      </TypesafeI18n>
    </ReduxProvider>
  );
}
