import { useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

export const Navigate: React.FunctionComponent<{ readonly onNavigate: (x: { readonly navigate: NavigateFunction }) => void }> = ({ onNavigate }) => {
  const navigate = useNavigate()

  useEffect(() => {
    onNavigate({ navigate })
  }, [navigate, onNavigate])

  return null
}