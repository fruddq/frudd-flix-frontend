import { useContext, useEffect } from "react"
import { GlobalContext } from "../stores/global"
import mobile from 'is-mobile'

export const Global: React.FunctionComponent = () => {
  const stateGlobal = useContext(GlobalContext)

  useEffect(() => {
    if (stateGlobal.bodyScrollBlocked && mobile()) {
      document.body.classList.add("mobile-scroll-block")
    } else {
      document.body.classList.remove("mobile-scroll-block")
    }
  }, [stateGlobal.bodyScrollBlocked, mobile])

  return null
}
