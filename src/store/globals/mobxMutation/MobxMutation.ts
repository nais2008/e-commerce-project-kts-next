import {
  type DefaultError,
  type MutateOptions,
  MutationObserver,
  type MutationObserverOptions,
  QueryClient,
} from "@tanstack/query-core"
import { createAtom, makeObservable, reaction } from "mobx"

class MobxMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> {
  private atom = createAtom(
    "MobxMutation",
    () => this.startTracking(),
    () => this.stopTracking()
  )
  private queryClient: QueryClient
  private getOptions: () => MutationObserverOptions<
    TData,
    TError,
    TVariables,
    TContext
  >
  private mutationObserver: MutationObserver<
    TData,
    TError,
    TVariables,
    TContext
  >

  constructor(
    getOptions: () => MutationObserverOptions<
      TData,
      TError,
      TVariables,
      TContext
    >,
    queryClient: QueryClient
  ) {
    this.queryClient = queryClient
    this.getOptions = getOptions
    this.mutationObserver = new MutationObserver(
      this.queryClient,
      this.defaultMutationOptions
    )
    makeObservable(this, {})
  }

  get result() {
    this.atom.reportObserved()
    return this.mutationObserver.getCurrentResult()
  }

  mutate(
    variables: TVariables,
    options?: MutateOptions<TData, TError, TVariables, TContext>
  ) {
    return this.mutationObserver.mutate(variables, options)
  }

  private unsubscribe = () => {}
  startTracking() {
    const unsubscribeReaction = reaction(
      () => this.defaultMutationOptions,
      () => {
        this.mutationObserver.setOptions(this.defaultMutationOptions)
      }
    )
    const unsubscribeObserver = this.mutationObserver.subscribe(() => {
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

  private get defaultMutationOptions() {
    return this.queryClient.defaultMutationOptions(this.getOptions())
  }
}

export default MobxMutation
