import { describe, it } from "vitest"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import TestRenderer from "react-test-renderer"
import { waitFor } from "@testing-library/react"
import axios from "axios"
import nock from "nock"

import { Loader } from "../components/Loader"
import { Movies as TheComponent } from "../routes/Movies"
import { Movies as ComponentMovies } from "../components/Movies"
import { API_URL } from "../config"

describe.only(TheComponent.name, () => {
  describe.concurrent("movies.length", () => {
    const routes = [
      {
        path: "/movies/:page",
        element: <TheComponent />,
      },
    ]

    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/movies/1"],
      initialIndex: 1,
    })

    it.skip("When there is no length", async () => {
      const { root } = TestRenderer.create(<RouterProvider router={router} />)

      expect(() => {
        root.findByType(Loader)
      }).not.toThrow()

      expect(() => {
        root.findByType(ComponentMovies)
      }).toThrow()
    })

    it.skip("When there length", async () => {

      // const { root } = TestRenderer.create(<RouterProvider router={router} />)

      const scope = nock(API_URL)
        .get("/discover")
        .reply(200, {
          page: 1,
          results: [
            {
              adult: false,
              backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
              genre_ids: [28, 12, 878],
              id: 505642,
              original_language: "en",
              original_title: "Black Panther: Wakanda Forever",
              overview:
                "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
              popularity: 3095.36,
              poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
              release_date: "2022-11-09",
              title: "Black Panther: Wakanda Forever",
              video: false,
              vote_average: 7.4,
              vote_count: 3494,
            },
          ],
          total_pages: 37257,
          total_results: 745134,
        })

      const response = await axios.get(`${API_URL}/discover`)

      // console.log(scope.isDone())
      console.log(response)

      // I need to change movies.length inside the component
      // in order to do that it has to async fetch
      // so we need to wait
      // await waitFor(
      //   () =>
      //     new Promise<void>((resolve, reject) => {
      //       setTimeout(() => {
      //         try {
      //           root.findByType(ComponentMovies)
      //           resolve()
      //         } catch {
      //           reject()
      //         }
      //       }, 10)
      //     })
      // )
    })
  })
})
