# IconPickerField

A custom Payload CMS field component that provides an icon picker interface supporting multiple react-icons packages.

## Features

- Icon selection from any react-icons package (Phosphor, Font Awesome, Feather, Hero Icons, etc.)
- Zero configuration required - just pass the icon pack
- Automatic display name generation (removes prefixes like "Pi", "Fa", etc.)
- Search functionality to filter icons
- Visual preview of selected icon
- Keyboard and mouse navigation
- Accessibility support
- Responsive design
- Localized labels support

## Usage

### Basic Usage

```typescript
import { iconPickerField } from "@/fields/IconPickerField";

const fields = [
    iconPickerField({
        name: "icon",
        label: "Icon",
    }),
];
```

### Advanced Usage with Localization

```typescript
import { iconPickerField } from "@/fields/IconPickerField";

const fields = [
    iconPickerField({
        name: "categoryIcon",
        label: {
            de: "Kategorie-Icon",
            en: "Category Icon",
        },
        admin: {
            description: {
                de: "Wählen Sie ein Icon für diese Kategorie",
                en: "Select an icon for this category",
            },
        },
        required: true,
    }),
];
```

### Using Different Icon Packs

```typescript
import { iconPickerField } from "@/fields/IconPickerField";
import * as FontAwesome from "react-icons/fa";
import * as FeatherIcons from "react-icons/fi";
import * as HeroIcons from "react-icons/hi";

const fields = [
    // Font Awesome Icons
    iconPickerField({
        name: "faIcon",
        label: "Font Awesome Icon",
        iconPack: FontAwesome,
    }),
    
    // Feather Icons
    iconPickerField({
        name: "featherIcon",
        label: "Feather Icon",
        iconPack: FeatherIcons,
    }),
    
    // Hero Icons
    iconPickerField({
        name: "heroIcon",
        label: "Hero Icon",
        iconPack: HeroIcons,
    }),
    
    // Default Phosphor Icons (no iconPack needed)
    iconPickerField({
        name: "phosphorIcon",
        label: "Phosphor Icon",
        // iconPack not specified = default Phosphor icons
    }),
];
```

### Example in Collection

```typescript
import { CollectionConfig } from "payload";
import { iconPickerField } from "@/fields/IconPickerField";

const Categories: CollectionConfig = {
    slug: "categories",
    fields: [
        {
            type: "text",
            name: "name",
            label: "Category Name",
            required: true,
        },
        iconPickerField({
            name: "icon",
            label: "Category Icon",
            admin: {
                description: "Select an icon to represent this category",
            },
        }),
    ],
};
```

## Field Options

The `iconPickerField` function accepts all standard Payload TextField options plus:

- `name`: Field name (default: "icon")
- `label`: Field label (supports localization)
- `required`: Whether the field is required
- `admin`: Admin configuration including description, position, etc.
- `iconPack`: Optional react-icons package (default: Phosphor icons)

## Data Format

The field stores the icon name as a string (e.g., "PiHome", "PiUser", "PiCheck").

### Using Icons in Frontend

#### Advanced Usage with Multiple Packs

```typescript
import { createIconMap, getIconFromMap } from "@/lib/iconPackUtils";
import * as PhosphorIcons from "react-icons/pi";
import * as FontAwesome from "react-icons/fa";

const MyComponent = ({ iconName, usePhosphor = true }: { iconName: string; usePhosphor?: boolean }) => {
    const iconPack = usePhosphor ? PhosphorIcons : FontAwesome;
    const iconMap = createIconMap(iconPack);
    const Icon = getIconFromMap(iconMap, iconName);
    
    return <Icon className="w-5 h-5" />;
};
```

#### Simple Direct Usage

```typescript
import { createIconMap } from "@/lib/iconPackUtils";
import * as PhosphorIcons from "react-icons/pi";

const MyComponent = ({ iconName }: { iconName: string }) => {
    const iconMap = createIconMap(PhosphorIcons);
    const Icon = iconMap[iconName];
    
    if (!Icon) return null;
    
    return <Icon className="w-5 h-5" />;
};
```

## Dependencies

- `@payloadcms/ui`: For Payload field components
- `react-icons`: For icon packages (supports any react-icons package)
- Custom utilities for icon management

## Styling

The component uses CSS custom properties that align with Payload's theme system:

- `--theme-elevation-*`: For backgrounds and borders
- `--theme-success-*`: For selection states
- Responsive design for mobile devices

## TypeScript Support

The field is fully typed and will generate proper TypeScript types when you run:

```bash
pnpm generate:types
```