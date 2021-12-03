import { EXTENSION_ID, JTranslateFn } from "extension/model"

export const translate: JTranslateFn = (
  key: string,
  params?: string | number | string[] | number[] | undefined,
  locale?: string | undefined
) => JMap.Language.translate({
  bundleId: EXTENSION_ID,
  key,
  params,
  locale: locale as any
})

export const getLocale: () => string = () => {
  return JMap.Language.getLocale()
}
