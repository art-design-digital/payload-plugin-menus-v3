import { de } from './locales/de.js'
import { en } from './locales/en.js'
import { es } from './locales/es.js'
import { fr } from './locales/fr.js'
import { nl } from './locales/nl.js'

export type SupportedLanguage = 'de' | 'en' | 'es' | 'fr' | 'nl'

export const locales = { de, en, es, fr, nl } as const

type LocaleStrings = Record<SupportedLanguage, string>

/**
 * Creates a multi-language label object from all locales
 * Payload expects: { de: 'German', en: 'English', ... }
 */
const t = (path: string): LocaleStrings => ({
  de: getNestedValue(de, path) as string,
  en: getNestedValue(en, path) as string,
  es: getNestedValue(es, path) as string,
  fr: getNestedValue(fr, path) as string,
  nl: getNestedValue(nl, path) as string,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedValue = (obj: any, path: string): unknown => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

/**
 * Multi-language labels for Payload admin UI
 */
export const labels = {
  client: {
    iconPicker: {
      clear: t('client.iconPicker.clear'),
      loadingIcons: t('client.iconPicker.loadingIcons'),
      noIconSelected: t('client.iconPicker.noIconSelected'),
      noResults: t('client.iconPicker.noResults'),
      searchIcons: t('client.iconPicker.searchIcons'),
    },
  },
  collection: {
    description: t('collection.description'),
    plural: t('collection.plural'),
    singular: t('collection.singular'),
  },
  fields: {
    anchor: t('fields.anchor'),
    child: t('fields.child'),
    children: t('fields.children'),
    childrenRequired: t('fields.childrenRequired'),
    highlight: t('fields.highlight'),
    icon: t('fields.icon'),
    item: t('fields.item'),
    itemFallback: t('fields.itemFallback'),
    items: t('fields.items'),
    label: t('fields.label'),
    linkType: t('fields.linkType'),
    linkTypeChildren: t('fields.linkTypeChildren'),
    linkTypeExternal: t('fields.linkTypeExternal'),
    linkTypeInternal: t('fields.linkTypeInternal'),
    marginTop: t('fields.marginTop'),
    openInNewTab: t('fields.openInNewTab'),
    previewImage: t('fields.previewImage'),
    reference: t('fields.reference'),
    referenceRequired: t('fields.referenceRequired'),
    title: t('fields.title'),
    url: t('fields.url'),
    urlInvalid: t('fields.urlInvalid'),
    urlRequired: t('fields.urlRequired'),
  },
  groups: {
    appearance: t('groups.appearance'),
    linkSettings: t('groups.linkSettings'),
  },
} as const
