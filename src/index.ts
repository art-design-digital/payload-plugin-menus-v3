import type { Config } from 'payload'

import type { MenusPluginConfig } from './types.js'

import { createMenusCollection } from './collections/Menus.js'

export type { MenusPluginConfig }

export const menusPlugin =
  (pluginConfig: MenusPluginConfig = {}) =>
  (config: Config): Config => {
    if (!config.collections) {
      config.collections = []
    }

    // Add the Menus collection
    config.collections.push(createMenusCollection(pluginConfig))

    // Early return if disabled (schema is preserved for migrations)
    if (pluginConfig.disabled) {
      return config
    }

    return config
  }
