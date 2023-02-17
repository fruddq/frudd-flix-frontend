export const navigateAndReturnNull = (callback: () => void): null => {
  callback()
  return null
}
