import type { ArrayField, CollectionConfig, Field } from 'payload'

import type { MenusPluginConfig } from '../types.js'

import {
  anchorField,
  customURLField,
  iconField,
  labelField,
  linkTypeField,
  marginTopField,
  openInNewTabField,
  referenceField,
  titleField,
} from '../fields/index.js'
import { labels } from '../i18n/translations.js'

const createMenuItemFields = (
  config: MenusPluginConfig,
  currentLevel: number,
  maxLevels: number,
): Field[] => {
  const {
    allowIcons = false,
    iconPack = 'Phosphor Icons',
    linkableCollections = [],
    localized = false,
  } = config
  const canHaveChildren = currentLevel < maxLevels
  const isChildLevel = currentLevel > 1

  const fields: Field[] = []

  // Add marginTop checkbox only for child items (not top-level)
  if (isChildLevel) {
    fields.push(marginTopField)
  }

  fields.push(labelField(localized))

  // Add icon field only if allowIcons is enabled
  if (allowIcons) {
    fields.push(iconField(iconPack))
  }

  fields.push(linkTypeField(canHaveChildren), customURLField(localized))

  if (linkableCollections.length > 0) {
    fields.push(referenceField(linkableCollections), anchorField)
  }

  fields.push(openInNewTabField)

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
    fields: [titleField(localized), itemsField],
    labels: {
      plural: labels.collection.plural,
      singular: labels.collection.singular,
    },
  }
}
