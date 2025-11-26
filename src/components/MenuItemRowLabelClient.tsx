'use client'

import { useRowLabel } from '@payloadcms/ui'

import { labels } from '../i18n/translations.js'

export const MenuItemRowLabelClient = () => {
  const { data, rowNumber } = useRowLabel<{ label?: string }>()

  const label = data?.label
  if (label) {
    return <span>{label}</span>
  }

  // Get language from html lang attribute or default to 'en'
  const lang = typeof document !== 'undefined' ? document.documentElement.lang || 'en' : 'en'
  const fallback =
    labels.fields.itemFallback[lang as keyof typeof labels.fields.itemFallback] ||
    labels.fields.itemFallback.en

  const paddedNumber = String((rowNumber ?? 0) + 1).padStart(2, '0')
  return <span>{`${fallback} | ${paddedNumber}`}</span>
}
