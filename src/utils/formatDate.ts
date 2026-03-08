/**
 * Форматирует дату в строку вида "DD Mon".
 *
 * @param date - Объект Date.
 * @returns Строка с днём и сокращённым месяцем или пустая строка, если дата некорректна.
 */

export const formatDate = (date: string): string => {
  if (!date) return ""

  return new Date(date).toLocaleDateString("en-En", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
