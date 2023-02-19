import { createContext } from "react"
import { genreList } from "../constants"
import type { IGenre } from "../models/Interfaces"

export enum EActionDropdown {
  Replace = "Replace",
}

interface IBrowseMenu {
  yearRange: { to: number; from: number }
  genres: IGenre[]
}

const getStoreBrowseMenu = () => {
  const keyLocalStorage = "browse"

  if (!localStorage.getItem(keyLocalStorage)) {
    localStorage.setItem(
      keyLocalStorage,
      JSON.stringify({
        genres: genreList.map((genre) => ({ ...genre, selected: false })),
        yearRange: {
          from: 1950,
          to: 2023,
        },
      }),
    )
  }

  const initialState: IBrowseMenu = JSON.parse(localStorage.getItem(keyLocalStorage)!)

  return {
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    contextState: createContext<typeof initialState>(null as any),
    contextDispatch: createContext<
      React.Dispatch<{
        readonly type: EActionDropdown
        readonly payload: IBrowseMenu
      }>
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    >(null as any),

    initialState,

    reducer(
      _state: typeof initialState,
      { type, payload: dropdownInfo }: { readonly type: EActionDropdown; readonly payload: IBrowseMenu },
    ) {
      if (type === EActionDropdown.Replace) {
        const newState = { ...dropdownInfo }
        localStorage.setItem(keyLocalStorage, JSON.stringify(newState))

        return newState
      }

      throw Error("Unknown action.")
    },
  }
}

export const storeDropdown = getStoreBrowseMenu()
