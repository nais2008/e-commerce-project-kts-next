import {
  type DefaultError,
  type DefaultedInfiniteQueryObserverOptions,
  type InfiniteData,
  InfiniteQueryObserver,
  type InfiniteQueryObserverOptions,
  type InfiniteQueryObserverResult,
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

  private currentResult: InfiniteQueryObserverResult<TData, TError>

  private unsubscribe = () => {}

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

    this.currentResult = this.queryObserver.getCurrentResult()

    makeObservable(this, {})
  }

  get result() {
    this.atom.reportObserved()
    return this.currentResult
  }

  fetchNextPage() {
    return this.queryObserver.fetchNextPage()
  }

  fetchPreviousPage() {
    return this.queryObserver.fetchPreviousPage()
  }

  hasNextPage() {
    return !!this.currentResult.hasNextPage
  }

  hasPreviousPage() {
    return !!this.currentResult.hasPreviousPage
  }

  private schedule(fn: () => void) {
    queueMicrotask(fn)
  }

  startTracking() {
    const unsubscribeReaction = reaction(
      () => this.defaultQueryOptions,
      (options) => {
        this.schedule(() => {
          this.queryObserver.setOptions(options)
        })
      },
      { fireImmediately: true }
    )

    const unsubscribeObserver = this.queryObserver.subscribe((result) => {
      this.schedule(() => {
        this.currentResult = result
        this.atom.reportChanged()
      })
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
