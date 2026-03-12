export type TCollectionModel<K extends string | number, T> = {
  order: K[]
  entities: Record<K, T>
}

export const getInitialCollectionModel = <
  K extends string | number,
  T,
>(): TCollectionModel<K, T> => ({
  order: [],
  entities: {} as Record<K, T>,
})

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K
): TCollectionModel<K, T> => {
  const collection: TCollectionModel<K, T> = getInitialCollectionModel()

  elements.forEach((el) => {
    const id = getKeyForElement(el)
    collection.order.push(id)
    collection.entities[id] = el
  })

  return collection
}

export const linearizeCollection = <K extends string | number, T>(
  elements: TCollectionModel<K, T>
): T[] => elements.order.map((el) => elements.entities[el])
