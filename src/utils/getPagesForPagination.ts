/**
 * Generates an array of page numbers and ellipsis for pagination display.
 *
 * @param page - Current active page
 * @param pageCount - Total number of pages
 * @param maxVisible - Maximum number of visible page items
 * @returns Array of page numbers and "..." placeholders
 */
export const getPagesForPagination = (
  page: number,
  pageCount: number,
  maxVisible: number
): (number | "...")[] => {
  if (pageCount <= maxVisible) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }

  const pages: (number | "...")[] = []

  const start = Math.max(1, page - 1)
  const end = Math.min(pageCount, page + 1)

  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push("...")
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < pageCount) {
    if (end < pageCount - 1) pages.push("...")
    pages.push(pageCount)
  }

  return pages
}
