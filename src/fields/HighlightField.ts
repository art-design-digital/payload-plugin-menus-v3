import type { CheckboxField } from 'payload'

import { labels } from '../i18n/translations.js'

export const highlightField: CheckboxField = {
  name: 'highlight',
  type: 'checkbox',
  defaultValue: false,
  label: labels.fields.highlight,
}
