import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locales/en.json'
import pt from '@/locales/pt.json'
const defaultImpl = VueI18n.prototype.getChoiceIndex

VueI18n.prototype.getChoiceIndex = function(choice, choicesLength) {
  if (this.locale !== 'pt') {
    return defaultImpl.apply(this, arguments)
  }

  if (choice === 0) {
    return 0;
  }

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;

  if (!teen && endsWithOne) {
    return 1;
  }

  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2;
  }

  return (choicesLength < 4) ? 2 : 3;
}

Vue.use(VueI18n)

const dateTimeFormats = {
  'en': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  },
  'pt': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  }
}

const numberFormats = {
  'en': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  },
  'pt': {
    currency: {
      style: 'currency', currency: 'BRL'
    }
  }
}

export const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: { en,pt },
  dateTimeFormats,
  numberFormats
})