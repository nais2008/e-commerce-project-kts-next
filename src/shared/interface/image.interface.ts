export interface IImage {
  id: number
  url: string
  formats: {
    thumbnail: {
      url: string
    }
    small: {
      url: string
    }
    medium: {
      url: string
    }
    large: {
      url: string
    }
  }
  alternativeText: string | null
}
