import {
  type DefaultError,
  QueryClient,
  type QueryKey,
  QueryObserver,
  type QueryObserverOptions,
} from "@tanstack/query-core"
import { computed, createAtom, makeObservable, reaction } from "mobx"

class MobxQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  private atom = createAtom(
    "MobxQuery",
    () => this.startTracking(),
    () => this.stopTracking()
  )

  private queryClient: QueryClient
  private getOptions: () => QueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >

  private queryObserver: QueryObserver<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >

  constructor(
    getOptions: () => QueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryData,
      TQueryKey
    >,
    queryClient: QueryClient
  ) {
    this.queryClient = queryClient
    this.getOptions = getOptions

    this.queryObserver = new QueryObserver(
      this.queryClient,
      this.defaultQueryOptions
    )

    makeObservable(this, {
      data: computed,
    })
  }

  get result() {
    this.atom.reportObserved()

    return this.queryObserver.getOptimisticResult(this.defaultQueryOptions)
  }

  get data(): TData {
    const data = this.result.data

    if (!data) {
      throw this.queryObserver.fetchOptimistic(this.defaultQueryOptions)
    }

    return data
  }

  private unsubscribe = () => {}
  startTracking() {
    const unsubscribeReaction = reaction(
      () => this.defaultQueryOptions,
      () => {
        this.queryObserver.setOptions(this.defaultQueryOptions)
      }
    )

    const unsubscribeObserver = this.queryObserver.subscribe(() => {
      this.atom.reportChanged()
    })

    this.unsubscribe = () => {
      unsubscribeReaction()
      unsubscribeObserver()
    }
  }

  stopTracking() {
    this.unsubscribe()
  }

  private get defaultQueryOptions() {
    return this.queryClient.defaultQueryOptions(this.getOptions())
  }
}

export default MobxQuery
