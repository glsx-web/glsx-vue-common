/*
 * @Author: limin
 * @Date: 2018-06-23 11:14:09
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-20 14:52:58
 */

export function GenerateTitle(title) {
  const hasKey = this.$te('route.' + title)
  const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return title
}
