import type { TextField } from 'payload'

import { labels } from '../i18n/translations.js'

export const customURLField = (localized: boolean): TextField => ({
  name: 'customURL',
  type: 'text',
  admin: {
    condition: (_, siblingData) => siblingData?.linkType === 'external',
  },
  label: labels.fields.url,
  localized,
})
