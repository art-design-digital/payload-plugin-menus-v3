import type { CheckboxField } from 'payload'

import { labels } from '../i18n/translations.js'

export const openInNewTabField: CheckboxField = {
  name: 'openInNewTab',
  type: 'checkbox',
  admin: {
    condition: (_, siblingData) => siblingData?.linkType !== 'children',
  },
  defaultValue: false,
  label: labels.fields.openInNewTab,
}
