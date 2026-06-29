import { LOCALE_MAP } from './i18n'

export function formatDate(date, lang, options) {
  return date.toLocaleDateString(LOCALE_MAP[lang] || 'en-US', options)
}