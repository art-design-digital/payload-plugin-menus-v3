'use client'

import type { IconType } from 'react-icons'

import { TextInput, useField } from '@payloadcms/ui'
import { ChevronIcon } from '@payloadcms/ui/icons/Chevron'
import { XIcon } from '@payloadcms/ui/icons/X'
import { useEffect, useMemo, useState } from 'react'

import type { IconPackType, IconPickerProps } from '../../lib/iconPackUtils.js'

import { labels } from '../../i18n/translations.js'
import { createIconMap, getIconPack } from '../../lib/iconPackUtils.js'
import './styles.css'

const IconPickerClient = (props: IconPickerProps) => {
  const {
    field: { admin, label, required = false },
    path,
  } = props

  // Description is nested under admin property in Payload fields
  const description = admin?.description
  const { setValue, showError, value } = useField<string>({ path })
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [iconMap, setIconMap] = useState<Record<string, IconType>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Try to get iconPack from admin
  const iconPackType: IconPackType = admin?.iconPack || 'Phosphor Icons'

  type TranslationKey = keyof typeof labels.client.iconPicker.clear

  // Detect current language from html lang attribute (fallback to 'en')
  const currentLanguage: TranslationKey =
    typeof document !== 'undefined'
      ? ((document.documentElement.lang || 'en') as TranslationKey)
      : 'en'

  // Helper to get translated string
  const t = (key: keyof typeof labels.client.iconPicker) =>
    labels.client.iconPicker[key][currentLanguage] || labels.client.iconPicker[key].en

  // Handle localized labels
  const labelText = typeof label === 'string' ? label : label.de || label.en || 'Icon'

  // Handle localized descriptions
  const descriptionText = description
    ? typeof description === 'string'
      ? description
      : (description as Record<string, string>)[currentLanguage] ||
        (description as Record<string, string>).de ||
        (description as Record<string, string>).en ||
        ''
    : ''

  // Load icon pack dynamically
  useEffect(() => {
    const loadIconPack = async () => {
      setIsLoading(true)
      try {
        const iconPack = await getIconPack(iconPackType)
        const map = createIconMap(iconPack)
        setIconMap(map)
      } catch {
        // Failed to load icon pack
      } finally {
        setIsLoading(false)
      }
    }

    void loadIconPack()
  }, [iconPackType])

  // Filter icons based on search term
  const filteredIcons = useMemo(() => {
    const icons = Object.keys(iconMap)
    if (!searchTerm) {
      return icons.slice(0, 50)
    } // Show first 50 icons by default

    return icons
      .filter((iconName) => iconName.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 50) // Limit to 50 results
  }, [searchTerm, iconMap])

  // Get the current selected icon component
  const SelectedIcon = value ? iconMap[value] : null

  const handleIconSelect = (iconName: string) => {
    setValue(iconName)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleClear = () => {
    setValue('')
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="icon-picker">
      <label className="field-label" htmlFor={`field-${path}`}>
        {labelText} {required && <span className="required">*</span>}
      </label>

      <div className="icon-picker-container react-select">
        {/* Selected Icon Display */}
        <div
          aria-controls="icon-picker-dropdown"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={labelText}
          className={`icon-picker-selected rs__control ${isLoading ? 'rs__control--is-disabled' : ''} ${showError ? 'rs__control--error' : ''}`}
          onClick={() => !isLoading && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              if (!isLoading) {
                setIsOpen(!isOpen)
              }
            }
            if (e.key === 'Escape' && isOpen) {
              setIsOpen(false)
            }
          }}
          role="combobox"
          tabIndex={0}
        >
          {SelectedIcon ? (
            <div className="icon-picker-preview">
              <SelectedIcon className="icon-picker-icon" />
            </div>
          ) : null}
          <div className="icon-picker-label">{value || t('noIconSelected')}</div>

          {/* Indicators container like Payload select */}
          <div className="rs__indicators">
            {/* Clear button (X) - only show when value exists */}
            {value && !isLoading && (
              <div
                aria-label={t('clear')}
                className="rs__indicator clear-indicator"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    handleClear()
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <XIcon className="clear-indicator__icon" />
              </div>
            )}

            {/* Dropdown arrow */}
            <div className="rs__indicator dropdown-indicator">
              <ChevronIcon
                className={`dropdown-indicator__icon ${isOpen ? 'dropdown-indicator__icon--rotated' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Visually hidden input for form value and label association */}
        <input
          aria-hidden="true"
          id={`field-${path}`}
          name={path}
          readOnly
          style={{
            height: '1px',
            left: '-9999px',
            opacity: 0,
            pointerEvents: 'none',
            position: 'absolute',
            width: '1px',
          }}
          tabIndex={-1}
          type="text"
          value={value || ''}
        />

        {/* Keep TextInput for Payload's form handling */}
        <TextInput
          label=""
          onChange={() => {}} // Controlled by icon selection
          path={path}
          style={{ display: 'none' }}
          value={value || ''}
        />

        {/* Icon Selection Dropdown */}
        {isOpen && (
          <div aria-label={t('searchIcons')} className="icon-picker-dropdown" role="listbox">
            {isLoading ? (
              <div className="icon-picker-loading">
                <div>{t('loadingIcons')}</div>
              </div>
            ) : (
              <>
                <div className="icon-picker-search">
                  <label className="visually-hidden" htmlFor={`search-${path}`}>
                    {t('searchIcons')}
                  </label>
                  <input
                    aria-label={t('searchIcons')}
                    className="icon-picker-search-input"
                    id={`search-${path}`}
                    name={`search-${path}`}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('searchIcons')}
                    type="text"
                    value={searchTerm}
                  />
                </div>

                <div className="icon-picker-grid">
                  {filteredIcons.map((iconName) => {
                    const IconComponent = iconMap[iconName]
                    return (
                      <button
                        aria-selected={value === iconName}
                        className={`icon-picker-option ${value === iconName ? 'selected' : ''}`}
                        key={iconName}
                        onClick={() => handleIconSelect(iconName)}
                        role="option"
                        title={iconName}
                        type="button"
                      >
                        <IconComponent className="icon-picker-icon" />
                        <span className="icon-picker-name">{iconName}</span>
                      </button>
                    )
                  })}
                </div>

                {filteredIcons.length === 0 && !isLoading && (
                  <div className="icon-picker-no-results">
                    {t('noResults')} &ldquo;{searchTerm}&rdquo;
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {descriptionText && <div className="field-description">{descriptionText}</div>}
    </div>
  )
}

export default IconPickerClient
