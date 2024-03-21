/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} string - the input string to capitalize
 * @return {string} the capitalized string
 */
export const capitalizeFirst = (string: string): string => {
  const capitalized = string.charAt(0).toUpperCase() + string.slice(1)

  return capitalized
}

export const dateFormatter = (timestamp: Date | string): string => {
  const formattedData = new Intl.DateTimeFormat().format(Number(timestamp))
  return formattedData
}
