import type { ArrayField, CollectionConfig, Field, TabsField } from 'payload'

import type { MenusPluginConfig } from '../types.js'

import {
  anchorField,
  customURLField,
  highlightField,
  iconField,
  labelField,
  linkTypeField,
  marginTopField,
  openInNewTabField,
  previewImageField,
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
    allowPreviewImages = false,
    iconPack = 'Phosphor Icons',
    linkableCollections = [],
    localized = false,
    previewImagesMediaCollection = 'media',
  } = config
  const canHaveChildren = currentLevel < maxLevels
  const isChildLevel = currentLevel > 1

  const fields: Field[] = []

  // Link Settings Tab
  const linkSettingsFields: Field[] = [
    labelField(localized),
    linkTypeField(canHaveChildren),
    customURLField(localized),
  ]

  if (linkableCollections.length > 0) {
    linkSettingsFields.push(referenceField(linkableCollections), anchorField)
  }

  linkSettingsFields.push(openInNewTabField)

  // Add children array to link settings if we haven't reached max depth
  if (canHaveChildren) {
    type TranslationKey = keyof typeof labels.fields.childrenRequired
    type MenuItemData = {
      linkType?: 'children' | 'external' | 'internal'
    }

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
      validate: (value, { req, siblingData }) => {
        const data = siblingData as MenuItemData
        if (data?.linkType === 'children' && (!value || value.length === 0)) {
          const lang = ((req?.i18n?.language || req?.locale) as TranslationKey) || 'en'
          return labels.fields.childrenRequired[lang] || labels.fields.childrenRequired.en
        }
        return true
      },
    }
    linkSettingsFields.push(childrenField)
  }

  // Appearance Tab
  const appearanceFields: Field[] = [highlightField]

  // Add marginTop checkbox only for child items (not top-level)
  if (isChildLevel) {
    appearanceFields.push(marginTopField)
  }

  // Add icon field only if allowIcons is enabled
  if (allowIcons) {
    appearanceFields.push(iconField(iconPack))
  }

  // Add preview image field only if allowPreviewImages is enabled
  if (allowPreviewImages) {
    appearanceFields.push(previewImageField(previewImagesMediaCollection))
  }

  const tabsField: TabsField = {
    type: 'tabs',
    tabs: [
      {
        fields: linkSettingsFields,
        label: labels.groups.linkSettings,
      },
      {
        fields: appearanceFields,
        label: labels.groups.appearance,
      },
    ],
  }

  fields.push(tabsField)

  return fields
}

export const createMenusCollection = (config: MenusPluginConfig): CollectionConfig => {
  const { access, adminGroup, levels = 2, localized = false } = config

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
      ...access,
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
