import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useI18nContext } from 'src/i18n/i18n-react';
import { Locales } from 'src/i18n/i18n-types';
import { loadLocale } from 'src/i18n/i18n-util.sync';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = new QueryClient();

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { setLocale, locale } = useI18nContext();

  React.useEffect(() => {
    const loadLanguage = async () => (await AsyncStorage.getItem('language')) as Locales | null;

    const applyLocale = (it: Locales) => {
      loadLocale(it);
      setLocale(it);
    };

    let unmounted = false; // Flag to check if component is unmounted

    loadLanguage()
      .then((v) => {
        if (!unmounted) {
          if (!v || (v !== 'th' && v !== 'en')) {
            AsyncStorage.setItem('language', 'th');
            applyLocale('th');
          } else {
            AsyncStorage.setItem('language', v);
            applyLocale(v);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      unmounted = true;
      if (locale === 'en') {
        applyLocale('th');
        AsyncStorage.setItem('language', 'th');
      } else {
        applyLocale('en');
        AsyncStorage.setItem('language', 'en');
      }
    };
  }, [setLocale, locale]);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default AppProvider;
