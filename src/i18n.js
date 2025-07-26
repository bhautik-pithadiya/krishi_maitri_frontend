import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import gu from './locales/gu.json'

const savedUser = localStorage.getItem('user')
let savedLang = 'en'


if (savedUser) {
  try {
    savedLang = JSON.parse(savedUser).language || 'en'
  } catch (e) {
    savedLang = 'en'
  }
}

const i18n = createI18n({
  locale: savedLang,
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages: {
    en,
    gu
  }
})

export default i18n
