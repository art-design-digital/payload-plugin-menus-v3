import type { ArrayField, CollectionConfig, Field } from 'payload'

import type { MenusPluginConfig } from '../types.js'

import { labels } from '../i18n/translations.js'

const createMenuItemFields = (
  config: MenusPluginConfig,
  currentLevel: number,
  maxLevels: number,
): Field[] => {
  const { linkableCollections = [], localized = false } = config

  const fields: Field[] = [
    {
      name: 'label',
      type: 'text',
      label: labels.fields.label,
      localized,
      required: true,
    },
    {
      name: 'linkType',
      type: 'radio',
      admin: {
        layout: 'horizontal',
      },
      defaultValue: 'internal',
      label: labels.fields.linkType,
      options: [
        {
          label: labels.fields.linkTypeInternal,
          value: 'internal',
        },
        {
          label: labels.fields.linkTypeExternal,
          value: 'external',
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === 'external',
      },
      label: labels.fields.url,
      localized,
    },
  ]

  if (linkableCollections.length > 0) {
    fields.push(
      {
        name: 'reference',
        type: 'relationship',
        admin: {
          allowCreate: false,
          condition: (_, siblingData) => siblingData?.linkType === 'internal',
        },
        label: labels.fields.reference,
        relationTo: linkableCollections,
      },
      {
        name: 'anchor',
        type: 'text',
        admin: {
          condition: (_, siblingData) => siblingData?.linkType === 'internal',
        },
        label: labels.fields.anchor,
      },
    )
  }

  fields.push({
    name: 'openInNewTab',
    type: 'checkbox',
    defaultValue: false,
    label: labels.fields.openInNewTab,
  })

  // Add children array if we haven't reached max depth
  if (currentLevel < maxLevels) {
    const childrenField: ArrayField = {
      name: 'children',
      type: 'array',
      admin: {
        components: {
          RowLabel: 'payload-plugin-menus-v3/client#MenuItemRowLabelClient',
        },
        initCollapsed: true,
      },
      fields: createMenuItemFields(config, currentLevel + 1, maxLevels),
      label: labels.fields.children,
    }
    fields.push(childrenField)
  }

  return fields
}

export const createMenusCollection = (config: MenusPluginConfig): CollectionConfig => {
  const { adminGroup, levels = 2, localized = false } = config

  const itemsField: ArrayField = {
    name: 'items',
    type: 'array',
    admin: {
      components: {
        RowLabel: 'payload-plugin-menus-v3/client#MenuItemRowLabelClient',
      },
      initCollapsed: true,
    },
    fields: createMenuItemFields(config, 1, levels),
    label: labels.fields.items,
  }

  return {
    slug: 'menus',
    access: {
      read: () => true,
    },
    admin: {
      description: labels.collection.description,
      group: adminGroup,
      useAsTitle: 'title',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        label: labels.fields.title,
        localized,
        required: true,
      },
      itemsField,
    ],
    labels: {
      plural: labels.collection.plural,
      singular: labels.collection.singular,
    },
  }
}
