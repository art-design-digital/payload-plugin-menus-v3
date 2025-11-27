import type { TextField } from 'payload'

import type { IconPackType } from '../../lib/iconPackUtils.js'

export type { IconPackType }

interface IconPickerFieldOptions extends Omit<TextField, 'type'> {
  iconPack?: IconPackType
}

export const iconPickerField = (overrides?: IconPickerFieldOptions): TextField => {
  const { name = 'icon', admin, iconPack, label = 'Icon', ...rest } = overrides ?? {}

  return {
    name,
    type: 'text',
    admin: {
      ...admin,
      components: {
        Field: '@art-design-digital/payload-plugin-menus-v3/client#IconPickerClient',
      },
      iconPack: iconPack || 'Phosphor Icons',
    },
    label: label as TextField['label'],
    ...rest,
  } as TextField
}
