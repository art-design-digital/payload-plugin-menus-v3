import type { CollectionConfig } from 'payload'

import type { IconPackType } from './fields/index.js'

export type MenusPluginConfig = {
  /**
   * Access control for the Menus collection
   * Override default access settings
   */
  access?: CollectionConfig['access']

  /**
   * Admin group name for the Menus collection
   */
  adminGroup?: string

  /**
   * Enable icon picker for menu items (default: false)
   */
  allowIcons?: boolean

  /**
   * Disable the plugin (keeps schema for migrations)
   */
  disabled?: boolean

  /**
   * Icon pack for menu item icons (default: 'Phosphor Icons')
   * Only used when allowIcons is true
   */
  iconPack?: IconPackType

  /**
   * Maximum nesting depth for menu items (1-3, default: 2)
   */
  levels?: 1 | 2 | 3

  /**
   * Collections that can be linked in menu items
   */
  linkableCollections?: string[]

  /**
   * Enable localization for menu fields (title, url, label)
   */
  localized?: boolean
}
