import { createContext } from "react"

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const GlobalContext = createContext<typeof GlobalInitialState>(null as any)
export const GlobalDispatchContext = createContext<
  React.Dispatch<{
    readonly type: EActionGlobal
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    readonly payload: any
  }>
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
>(null as any)

export enum EActionGlobal {
  ToggleBodyScroll = "ToggleBodyScroll",
}

export const GlobalInitialState = { bodyScrollBlocked: false }

export const GlobalReducer = (
  state = GlobalInitialState,
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  { type, payload }: { readonly type: EActionGlobal; readonly payload: any },
) => {
  switch (type) {
    case EActionGlobal.ToggleBodyScroll: {
      return {
        ...state,
        bodyScrollBlocked: payload,
      } as typeof GlobalInitialState
    }

    default: {
      throw Error(`Unknown action: ${type}`)
    }
  }
}
