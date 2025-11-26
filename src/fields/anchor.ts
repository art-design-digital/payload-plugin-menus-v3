import type { TextField } from 'payload'

import { labels } from '../i18n/translations.js'

export const anchorField: TextField = {
  name: 'anchor',
  type: 'text',
  admin: {
    condition: (_, siblingData) => siblingData?.linkType === 'internal',
  },
  label: labels.fields.anchor,
}
