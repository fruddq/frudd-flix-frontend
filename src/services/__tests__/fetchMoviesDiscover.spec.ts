import { describe, it } from "vitest"
import nock from "nock"

import { fetchMoviesDiscover as theModule } from "../fetchMoviesDiscover"
import { API_URL } from "../../config"

describe.concurrent(theModule.name, () => {
  it.concurrent("When there length", async ({ expect }) => {
    const responseData = {
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
    }

    nock(API_URL).get("/discover?page=1").reply(200, responseData)

    const response = await theModule({ page: 1 })
    expect(response).toEqual(responseData)
  })
})
