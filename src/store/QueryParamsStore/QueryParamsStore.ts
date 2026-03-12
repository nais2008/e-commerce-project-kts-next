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
      queryString: computed,
    })
  }

  get queryString() {
    return qs.stringify(this._params)
  }

  getParam(key: string): qs.ParsedQs[string] {
    return this._params[key]
  }

  setParam(key: string, value: qs.ParsedQs[string]) {
    if (value === undefined) {
      delete this._params[key]
    } else {
      this._params[key] = value
    }
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search
    const newParams = qs.parse(search)
    this._params = newParams
  }
}

export default QueryParamsStore
