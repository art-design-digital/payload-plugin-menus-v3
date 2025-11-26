import type { UploadField } from 'payload'

import { labels } from '../i18n/translations.js'

export const previewImageField = (mediaCollection: string): UploadField => ({
  name: 'previewImage',
  type: 'upload',
  label: labels.fields.previewImage,
  relationTo: mediaCollection,
})
