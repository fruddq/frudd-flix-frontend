import * as qs from "qs"

export class DOM {
  static getters = {
    URLQuery() {
      if (window.location.search.startsWith("?")) {
        const queryString = window.location.search.slice(1)
        return qs.parse(queryString)
      }
      return {}
    },
  }
}
