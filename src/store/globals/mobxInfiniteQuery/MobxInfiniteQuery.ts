import {
  type DefaultError,
  type DefaultedInfiniteQueryObserverOptions,
  type InfiniteData,
  InfiniteQueryObserver,
  type InfiniteQueryObserverOptions,
  QueryClient,
  type QueryKey,
} from "@tanstack/query-core"
import { createAtom, makeObservable, reaction } from "mobx"

class MobxInfiniteQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> {
  private atom = createAtom(
    "MobxInfiniteQuery",
    () => this.startTracking(),
    () => this.stopTracking()
  )
  private queryClient: QueryClient
  private getOptions: () => InfiniteQueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >
  private queryObserver: InfiniteQueryObserver<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >

  constructor(
    getOptions: () => InfiniteQueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
    queryClient: QueryClient
  ) {
    this.queryClient = queryClient
    this.getOptions = getOptions
    this.queryObserver = new InfiniteQueryObserver(
      this.queryClient,
      this.defaultQueryOptions
    )
    makeObservable(this, {})
  }

  get result() {
    this.atom.reportObserved()
    return this.queryObserver.getOptimisticResult(this.defaultQueryOptions)
  }

  fetchNextPage() {
    return this.queryObserver.fetchNextPage()
  }

  fetchPreviousPage() {
    return this.queryObserver.fetchPreviousPage()
  }

  hasNextPage() {
    return this.result.hasNextPage
  }

  hasPreviousPage() {
    return this.result.hasPreviousPage
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
    return this.queryClient.defaultQueryOptions(
      this.getOptions()
    ) as DefaultedInfiniteQueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >
  }
}

export default MobxInfiniteQuery
