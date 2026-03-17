import { action, computed, makeObservable, observable } from "mobx"
import qs from "qs"

type PrivateFields = "_params"

class QueryParamsStore {
  private _params: qs.ParsedQs = {}

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable,
      setSearch: action,
      setParam: action,
      setStringParam: action,
      setNumberParam: action,
      deleteParam: action,
      queryString: computed,
    })
  }

  get queryString() {
    return qs.stringify(this._params, {
      encode: false,
      skipNulls: true,
    })
  }

  private getRawParamValue(key: string): string | undefined {
    const value = this._params[key]

    if (typeof value === "string") return value
    if (Array.isArray(value)) {
      const [first] = value
      return typeof first === "string" ? first : undefined
    }

    return undefined
  }

  getStringParam(key: string): string | undefined {
    const value = this.getRawParamValue(key)
    if (!value) return undefined

    return value
  }

  getNumberParam(key: string): number | undefined {
    const value = this.getRawParamValue(key)
    if (!value) return undefined

    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }

  setParam(key: string, value: qs.ParsedQs[string]) {
    if (value === undefined || value === "") {
      delete this._params[key]
    } else {
      this._params[key] = value
    }
  }

  setStringParam(key: string, value: string | undefined) {
    this.setParam(key, value?.trim())
  }

  setNumberParam(key: string, value: number | undefined) {
    if (value === undefined || !Number.isFinite(value)) {
      this.setParam(key, undefined)
      return
    }

    this.setParam(key, String(value))
  }

  deleteParam(key: string) {
    this.setParam(key, undefined)
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search
    const newParams = qs.parse(search)
    this._params = newParams
  }
}

export default QueryParamsStore
