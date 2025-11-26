import type { ArrayField, CollectionConfig, Field, OptionObject } from 'payload'

import type { MenusPluginConfig } from '../types.js'

import { labels } from '../i18n/translations.js'

const createMenuItemFields = (
  config: MenusPluginConfig,
  currentLevel: number,
  maxLevels: number,
): Field[] => {
  const { linkableCollections = [], localized = false } = config
  const canHaveChildren = currentLevel < maxLevels

  const linkTypeOptions: OptionObject[] = [
    {
      label: labels.fields.linkTypeInternal,
      value: 'internal',
    },
    {
      label: labels.fields.linkTypeExternal,
      value: 'external',
    },
  ]

  // Only add "children" option if we can have children at this level
  if (canHaveChildren) {
    linkTypeOptions.push({
      label: labels.fields.linkTypeChildren,
      value: 'children',
    })
  }

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
      options: linkTypeOptions,
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
    admin: {
      condition: (_, siblingData) => siblingData?.linkType !== 'children',
    },
    defaultValue: false,
    label: labels.fields.openInNewTab,
  })

  // Add children array if we haven't reached max depth
  if (canHaveChildren) {
    const childrenField: ArrayField = {
      name: 'children',
      type: 'array',
      admin: {
        components: {
          RowLabel: 'payload-plugin-menus-v3/client#MenuItemRowLabelClient',
        },
        condition: (_, siblingData) => siblingData?.linkType === 'children',
        initCollapsed: true,
      },
      fields: createMenuItemFields(config, currentLevel + 1, maxLevels),
      label: labels.fields.children,
      labels: {
        plural: labels.fields.children,
        singular: labels.fields.child,
      },
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
    labels: {
      plural: labels.fields.items,
      singular: labels.fields.item,
    },
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
