import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import gu from './locales/gu.json'
import ta from './locales/ta.json'
import kn from './locales/kn.json'
import mr from './locales/mr.json'
import bn from './locales/bn.json'

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
    gu,
    ta,
    kn,
    mr,
    bn
  }
})

export default i18n
