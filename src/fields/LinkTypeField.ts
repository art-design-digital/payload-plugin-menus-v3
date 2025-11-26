import type { OptionObject, RadioField } from 'payload'

import { labels } from '../i18n/translations.js'

export const linkTypeField = (canHaveChildren: boolean): RadioField => {
  const options: OptionObject[] = [
    {
      label: labels.fields.linkTypeInternal,
      value: 'internal',
    },
    {
      label: labels.fields.linkTypeExternal,
      value: 'external',
    },
  ]

  if (canHaveChildren) {
    options.push({
      label: labels.fields.linkTypeChildren,
      value: 'children',
    })
  }

  return {
    name: 'linkType',
    type: 'radio',
    admin: {
      layout: 'horizontal',
    },
    defaultValue: 'internal',
    label: labels.fields.linkType,
    options,
  }
}
