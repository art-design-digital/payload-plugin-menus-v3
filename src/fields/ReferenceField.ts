import type { RelationshipField } from 'payload'

import { labels } from '../i18n/translations.js'

type MenuItemData = {
  linkType?: 'children' | 'external' | 'internal'
}

type TranslationKey = keyof typeof labels.fields.referenceRequired

export const referenceField = (relationTo: string[]): RelationshipField => ({
  name: 'reference',
  type: 'relationship',
  admin: {
    allowCreate: false,
    condition: (_, siblingData) => siblingData?.linkType === 'internal',
  },
  label: labels.fields.reference,
  relationTo,
  validate: (value, { req, siblingData }) => {
    const data = siblingData as MenuItemData
    if (data?.linkType === 'internal' && !value) {
      const lang = ((req?.i18n?.language || req?.locale) as TranslationKey) || 'en'
      return labels.fields.referenceRequired[lang] || labels.fields.referenceRequired.en
    }
    return true
  },
})
