import type { TextField } from 'payload'

import { labels } from '../i18n/translations.js'

export const titleField = (localized: boolean): TextField => ({
  name: 'title',
  type: 'text',
  label: labels.fields.title,
  localized,
  required: true,
})
