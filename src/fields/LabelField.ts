import type { TextField } from 'payload'

import { labels } from '../i18n/translations.js'

export const labelField = (localized: boolean): TextField => ({
  name: 'label',
  type: 'text',
  label: labels.fields.label,
  localized,
  required: true,
})
