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
   * Maximum nesting depth for menu items (default: 3)
   */
  levels?: number

  /**
   * Collections that can be linked in menu items
   */
  linkableCollections?: string[]

  /**
   * Enable localization for menu fields (title, url)
   */
  localized?: boolean
}
