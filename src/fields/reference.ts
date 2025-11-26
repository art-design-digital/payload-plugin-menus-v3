import type { RelationshipField } from 'payload'

import { labels } from '../i18n/translations.js'

export const referenceField = (relationTo: string[]): RelationshipField => ({
  name: 'reference',
  type: 'relationship',
  admin: {
    allowCreate: false,
    condition: (_, siblingData) => siblingData?.linkType === 'internal',
  },
  label: labels.fields.reference,
  relationTo,
})
