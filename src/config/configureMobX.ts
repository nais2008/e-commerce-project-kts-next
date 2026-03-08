import { configure } from "mobx"

configure({
  enforceActions: "observed",
  useProxies: "ifavailable",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
})
