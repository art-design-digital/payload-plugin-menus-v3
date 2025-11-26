import type { TextField } from 'payload'

import type { IconPackType } from './IconPickerField/index.js'

import { labels } from '../i18n/translations.js'
import { iconPickerField } from './IconPickerField/index.js'

export type { IconPackType }

export const iconField = (iconPack?: IconPackType): TextField =>
  iconPickerField({
    name: 'icon',
    iconPack,
    label: labels.fields.icon,
  })
