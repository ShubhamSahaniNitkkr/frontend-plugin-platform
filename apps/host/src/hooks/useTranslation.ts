import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import {
  translations,
  type TranslationKey,
  type Locale,
} from '../i18n/translations';

export function useTranslation() {
  const locale = useSelector((state: RootState) => state.locale.locale);

  const t = useCallback(
    (key: TranslationKey) =>
      translations[locale]?.[key] ?? translations.en[key] ?? key,
    [locale]
  );

  return { t, locale: locale as Locale };
}
