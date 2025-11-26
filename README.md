# Payload Plugin Menus v3

A flexible navigation menu plugin for [Payload CMS](https://payloadcms.com) v3.

## Features

- Create and manage navigation menus with nested items (up to 3 levels)
- Support for internal links (references to collections), external links, and parent items with children
- Optional icon picker with [react-icons](https://react-icons.github.io/react-icons/) support
- Full i18n support (EN, DE, ES, FR, NL)
- Localized menu labels and URLs
- Validation for required fields

## Installation

```bash
npm install payload-plugin-menus-v3
# or
pnpm add payload-plugin-menus-v3
# or
yarn add payload-plugin-menus-v3
```

### Optional: Icon Picker

If you want to use the icon picker feature, you also need to install `react-icons`:

```bash
npm install react-icons
```

## Usage

Add the plugin to your Payload config:

```ts
import { buildConfig } from 'payload'
import { menusPlugin } from 'payload-plugin-menus-v3'

export default buildConfig({
  // ... your config
  plugins: [
    menusPlugin({
      // Link to these collections for internal links
      linkableCollections: ['pages', 'posts'],
      // Optional: Menu nesting depth (1-3, default: 2)
      levels: 2,
      // Optional: Admin group name
      adminGroup: 'Navigation',
      // Optional: Enable localization for labels and URLs
      localized: true,
      // Optional: Enable icon picker (default: false)
      allowIcons: true,
      // Optional: Icon pack to use (default: 'Phosphor Icons')
      iconPack: 'Phosphor Icons',
      // Optional: Disable the plugin
      disabled: false,
    }),
  ],
})
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `linkableCollections` | `string[]` | `[]` | Collection slugs that can be linked to for internal links |
| `levels` | `1 \| 2 \| 3` | `2` | Maximum nesting depth for menu items |
| `adminGroup` | `string` | `undefined` | Admin panel group name for the Menus collection |
| `localized` | `boolean` | `false` | Enable localization for menu item labels and URLs |
| `allowIcons` | `boolean` | `false` | Enable the icon picker field for menu items |
| `iconPack` | `IconPackType` | `'Phosphor Icons'` | Icon pack to use (requires `react-icons`) |
| `allowPreviewImages` | `boolean` | `false` | Enable preview image upload for menu items |
| `previewImagesMediaCollection` | `string` | `'media'` | Media collection slug for preview images |
| `access` | `CollectionConfig['access']` | `{ read: () => true }` | Override access control for the Menus collection |
| `disabled` | `boolean` | `false` | Disable the plugin |

### Available Icon Packs

When `allowIcons` is enabled, you can choose from these icon packs:

- `'Phosphor Icons'` (default)
- `'Bootstrap Icons'`
- `'Feather Icons'`
- `'Font Awesome 6'`
- `'Heroicons 2'`
- `'Lucide Icons'`
- `'Material Design Icons'`
- `'Remix Icons'`
- `'Tabler Icons'`

## Menu Item Structure

Each menu item is organized into two tabs:

### Link Settings Tab

| Field | Description |
|-------|-------------|
| `label` | Display text for the menu item (required) |
| `linkType` | Type of link: `internal`, `external`, or `children` |
| `customURL` | External URL (when `linkType` is `external`, must start with `https://`) |
| `reference` | Reference to a document (when `linkType` is `internal`) |
| `anchor` | Optional anchor/hash for internal links (e.g., `#section`) |
| `openInNewTab` | Open link in a new tab |
| `children` | Nested menu items (when `linkType` is `children`) |

### Appearance Tab

| Field | Description |
|-------|-------------|
| `highlight` | Highlight this menu item (e.g., for CTA buttons) |
| `marginTop` | Add spacing above this item (child items only) |
| `icon` | Selected icon name (when `allowIcons` is enabled) |
| `previewImage` | Reference to a media item (when `allowPreviewImages` is enabled) |

## Using the IconPicker Field Standalone

You can also use the icon picker field in your own collections:

```ts
import { iconPickerField } from 'payload-plugin-menus-v3'

const MyCollection = {
  slug: 'my-collection',
  fields: [
    iconPickerField({
      name: 'icon',
      label: 'Icon',
      iconPack: 'Lucide Icons',
    }),
  ],
}
```

## Fetching Menus

You can fetch menus using the Payload Local API or REST API:

```ts
// Local API
const menu = await payload.find({
  collection: 'menus',
  where: {
    title: { equals: 'Main Navigation' },
  },
})

// REST API
// GET /api/menus?where[title][equals]=Main Navigation
```

## i18n Support

The plugin includes translations for:

- English (en)
- German (de)
- Spanish (es)
- French (fr)
- Dutch (nl)

All field labels, validation messages, and UI elements are translated based on your Payload admin language setting.

## TypeScript

The plugin exports types for use in your project:

```ts
import type { MenusPluginConfig, IconPackType } from 'payload-plugin-menus-v3'
```

## License

MIT
