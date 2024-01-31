/**
 * 判断是否为外部资源
 */
export function isExternal(path) {
  console.log('判断',/^(https?:|mailto:|tel:)/.test(path))
  return /^(https?:|mailto:|tel:)/.test(path)
}
