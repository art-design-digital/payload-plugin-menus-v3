import type { TextField } from 'payload'

import { labels } from '../i18n/translations.js'

type MenuItemData = {
  linkType?: 'children' | 'external' | 'internal'
}

type TranslationKey = keyof typeof labels.fields.urlRequired

export const customURLField = (localized: boolean): TextField => ({
  name: 'customURL',
  type: 'text',
  admin: {
    condition: (_, siblingData) => siblingData?.linkType === 'external',
  },
  label: labels.fields.url,
  localized,
  validate: (value, { req, siblingData }) => {
    const data = siblingData as MenuItemData
    if (data?.linkType === 'external') {
      const lang = ((req?.i18n?.language || req?.locale) as TranslationKey) || 'en'
      if (!value) {
        return labels.fields.urlRequired[lang] || labels.fields.urlRequired.en
      }
      if (!value.startsWith('https://')) {
        return labels.fields.urlInvalid[lang] || labels.fields.urlInvalid.en
      }
    }
    return true
  },
})
