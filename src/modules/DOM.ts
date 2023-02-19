import * as qs from "qs"
import type { Location } from "react-router-dom"

export class DOM {
  static getters = {
    URLQuery(location: Location) {
      if (location.search.startsWith("?")) {
        const queryString = location.search.slice(1)
        return qs.parse(queryString)
      }
      return {}
    },
  }
}
