import type { CheckboxField } from 'payload'

import { labels } from '../i18n/translations.js'

export const marginTopField: CheckboxField = {
  name: 'marginTop',
  type: 'checkbox',
  defaultValue: false,
  label: labels.fields.marginTop,
}
