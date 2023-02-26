import discover from "../fixtures/discover.json"
import { API_VERSION } from "../../src/config"

// @TODO REMOVE WAIT wherever not needed
// BLOCK SCROLLING
describe("e2e", () => {
  describe("Page content and navigation", () => {
    it("Loads first page with correct information", () => {
      cy.visit("/movies/1")

      cy.intercept(`/api${API_VERSION}/discover?page=1`, { fixture: "discover.json" }).as("discoverData")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData")
      cy.wait(["@discoverData", "@trailersData"])

      const { page, results } = discover

      results.forEach((movie, i) => {
        cy.get(".movie-title").eq(i).should("contain", movie.title)
        cy.get(".movie-year").eq(i).should("contain", movie.release_date.substring(0, 4))
        cy.get(".movie-rating").eq(i).should("contain", movie.vote_average.toString())
        cy.get(".movie-genre-container").eq(i).find(".menu-button").should("have.length", movie.genre_ids.length)
      })

      cy.get(".current-page-numb").should("contain", page)
      cy.get(".total-pages").should("contain", "500")
    })

    it("Next button takes user to next page, first and last buttons is disabled", () => {
      cy.visit("/movies/1")

      cy.intercept(`/api${API_VERSION}/discover?page=1`, { fixture: "discover.json" }).as("discoverData1")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData1")

      cy.get(".first-btn").should("be.disabled")
      cy.get(".previous-btn").should("be.disabled")

      cy.get(".next-btn").click()

      cy.intercept(`/api${API_VERSION}/discover?page=2`, { fixture: "discover.json" }).as("discoverData2")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData2")

      cy.url().should("include", "/movies/2")
    })

    it("Last page button takes user to last page, last page button disabled at last page", () => {
      cy.visit("/movies/1")

      cy.intercept(`/api${API_VERSION}/discover?page=1`, { fixture: "discover.json" }).as("discoverData1")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData1")
      cy.wait(["@discoverData1", "@trailersData1"])

      cy.get(".last-btn").click()

      cy.intercept(`/api${API_VERSION}/discover?page=500`, { fixture: "discover.json" }).as("discoverData2")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData2")
      cy.wait(["@discoverData2", "@trailersData2"])

      cy.url().should("include", "/movies/500")
      cy.get(".last-btn").should("be.disabled")
    })

    it("Previous button takes user to previous page", () => {
      cy.visit("/movies/3")

      cy.intercept(`/api${API_VERSION}/discover?page=3`, { fixture: "discover.json" }).as("discoverData1")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData1")
      cy.wait(["@discoverData1", "@trailersData1"])

      cy.get(".previous-btn").click()

      cy.intercept("/api/v1/discover?page=2", { fixture: "discover.json" }).as("discoverData2")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData2")
      cy.wait(["@discoverData2", "@trailersData2"])

      cy.url().should("include", "/movies/2")
    })

    it("First page button takes user to first page", () => {
      cy.visit("/movies/355")

      cy.intercept(`/api${API_VERSION}/discover?page=355`, { fixture: "discover.json" }).as("discoverData1")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData1")
      cy.wait(["@discoverData1", "@trailersData1"])

      cy.get(".first-btn").click()

      cy.intercept(`/api${API_VERSION}/discover?page=1`, { fixture: "discover.json" }).as("discoverData2")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData2")
      cy.wait(["@discoverData2", "@trailersData2"])

      cy.url().should("include", "/movies/1")
    })

    it("Logo button takes user to first page", () => {
      cy.visit("/movies/355")

      cy.intercept(`/api${API_VERSION}/discover?page=1`, { fixture: "discover.json" }).as("discoverData1")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData1")
      cy.wait(["@discoverData1", "@trailersData1"])

      cy.get(".frudd-flix-logo").click()

      cy.intercept("/api/v1/discover?page=1", { fixture: "discover.json" }).as("discoverData2")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData2")
      cy.wait(["@discoverData2", "@trailersData2"])

      cy.url().should("include", "/movies/1")
    })
  })

  describe("Browse", () => {
    it("searches for correct genres", () => {
      cy.visit("/movies/1")

      cy.intercept(`/api${API_VERSION}/discover?page=1`, { fixture: "discover.json" }).as("discoverData")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData")
      cy.wait(["@discoverData", "@trailersData"])

      cy.contains("button", "Browse").click()

      cy.contains("button", "Action").click()
      cy.contains("button", "Comedy").click()
      cy.contains("button", "Science Fiction").click()

      cy.contains("button", "Find Movies").click()

      cy.intercept(`/api${API_VERSION}/browse?from=1950&to=2023&genres[]=35&genres[]=28&genres[]=878&page=1`, {
        fixture: "discover.json",
      }).as("discoverData2")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData")
      cy.wait(["@discoverData2", "@trailersData2"])

      cy.url()
        .should("include", "Action")
        .should("include", "Comedy")
        .should("include", "Science")
        .should("include", "Fiction")
        .should("include", "page=1")
    })

    it("searches for correct years", () => {
      cy.visit("/movies/1")
      cy.clearLocalStorage()

      cy.intercept(`/api${API_VERSION}/discover?page=1`, { fixture: "discover.json" }).as("discoverData")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData")
      cy.wait(["@discoverData", "@trailersData"])

      cy.contains("button", "Browse").click()

      cy.contains("button", "Comedy").click()

      cy.get(".thumb").eq(0).click().type("{rightarrow}{rightarrow}")
      cy.get(".thumb").eq(1).click().type("{leftarrow}{leftarrow}")

      cy.contains("button", "Find Movies").click()

      cy.intercept(`/api${API_VERSION}/browse?from=1952&to=2021&genres[]=35&page=1`, {
        fixture: "discover.json",
      }).as("discoverData2")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData2")
      cy.wait(["@discoverData2", "@trailersData2"])

      cy.url()
        .should("include", "page=1")
        .should("include", "Comedy")
        .should("include", "from=1952")
        .should("include", "to=2021")
    })

    it("handles two diffirent searches and remembers last input", () => {
      cy.visit("/movies/1")
      cy.clearLocalStorage()

      cy.intercept(`/api${API_VERSION}/discover?page=1`, { fixture: "discover.json" }).as("discoverData")
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData")
      cy.wait(["@discoverData", "@trailersData"])

      cy.contains("button", "Browse").click()

      cy.contains("button", "Comedy").click()

      cy.contains("button", "Find Movies").click()

      cy.intercept(`/api${API_VERSION}/browse?from=1950&to=2023&genres[]=35&page=1`, {
        fixture: "discover.json",
      }).as("discoverData2")
      cy.wait("@discoverData2")

      cy.contains("button", "Browse").click()

      cy.contains("button", "Comedy").click()
      cy.contains("button", "Action").click()

      cy.get(".thumb").eq(0).click().type("{rightarrow}{rightarrow}")
      cy.get(".thumb").eq(1).click().type("{leftarrow}{leftarrow}")

      cy.contains("button", "Find Movies").click()

      cy.intercept(`/api${API_VERSION}/browse?from=1952&to=2021&genres[]=28&page=1`, {
        fixture: "discover.json",
      }).as("discoverData3")

      cy.wait("@discoverData3")

      cy.contains("button", "Browse").click()

      cy.url()
        .should("include", "page=1")
        .should("include", "Action")
        .should("include", "from=1952")
        .should("include", "to=2021")

      cy.get(".selected").contains("Action")
      cy.get(".slider-min-text").contains("1952")
      cy.get(".slider-max-text").contains("2021")
    })

    it("navigates to next page", () => {
      cy.visit("/browse?from=1950&to=2023&genres=Comedy&page=1")
      cy.clearLocalStorage()

      cy.intercept(`/api${API_VERSION}/browse?from=1950&to=2023&genres[]=35&page=1`, { fixture: "discover.json" }).as(
        "discoverData",
      )
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData")
      cy.wait(["@discoverData", "@trailersData"])

      cy.get(".next-btn").click()

      cy.intercept(`/api${API_VERSION}/browse?from=1950&to=2023&genres[]=35&page=2`, { fixture: "discover.json" }).as(
        "discoverData2",
      )
      cy.wait("@discoverData2")

      cy.url().should("include", "page=2")
    })

    it("navigates to previous page", () => {
      cy.visit("/browse?from=1950&to=2023&genres=Comedy&page=2")
      cy.clearLocalStorage()

      cy.intercept(`/api${API_VERSION}/browse?from=1950&to=2023&genres[]=35&page=2`, { fixture: "discover.json" }).as(
        "discoverData",
      )
      cy.intercept(`/api${API_VERSION}/trailers*`, { fixture: "trailers.json" }).as("trailersData")
      cy.wait(["@discoverData", "@trailersData"])

      cy.get(".previous-btn").click()

      cy.intercept(`/api${API_VERSION}/browse?from=1950&to=2023&genres[]=35&page=1`, { fixture: "discover.json" }).as(
        "discoverData2",
      )
      cy.wait("@discoverData2")

      cy.url().should("include", "page=1")
    })
  })
})
