export type MenusPluginConfig = {
  /**
   * Admin group name for the Menus collection
   */
  adminGroup?: string

  /**
   * Disable the plugin (keeps schema for migrations)
   */
  disabled?: boolean

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
