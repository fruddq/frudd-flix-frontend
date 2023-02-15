import { createContext } from "react"

export enum EActionNumberArray {
  Add = "Add",
  Remove = "Remove",
}

export const getStoreNumberArray = (keyLocalStorage: string) => {
  if (!localStorage.getItem(keyLocalStorage)) {
    localStorage.setItem(keyLocalStorage, JSON.stringify([]))
  }

  const initialState: number[] = JSON.parse(localStorage.getItem(keyLocalStorage)!)

  return {
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    contextState: createContext<typeof initialState>(null as any),
    contextDispatch: createContext<
      React.Dispatch<{
        readonly type: EActionNumberArray
        readonly payload: number
      }>
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    >(null as any),
    initialState,
    // @TODO hadnel duplicates
    reducer(
      state: typeof initialState,
      { type, payload: movieID }: { readonly type: EActionNumberArray; readonly payload: number },
    ) {
      if (type === EActionNumberArray.Add) {
        state.push(movieID)
        localStorage.setItem(keyLocalStorage, JSON.stringify(state))

        console.log("addin movies", state)
        return [...state]
      }

      if (type === EActionNumberArray.Remove) {
        const newState = state.filter((ID) => movieID !== ID)
        localStorage.setItem(keyLocalStorage, JSON.stringify(newState))
        console.log("removing movies", newState)

        return newState
      }
      throw Error("Unknown action.")
    },
  }
}
