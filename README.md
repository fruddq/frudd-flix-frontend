ts-node-dev --respawn --transpile-only server.ts 

transpile only compilation checks/typescript in this case

Goals
Should be able to:
- search by genre
- search by year
- Search for best comedies in year 2010 to 2023
- search should include filter to achieve the above goals
- when clicking year => search all movies released searchYear 
- pagination
- animations
- Code cleanup, code review

- code should be test covered
- e2e test, cypress, playwright, selenium

- deploy to heroku

https://www.themoviedb.org/documentation/api/discover

● A search field and like a table for showing the result. 
Take input from field, use it to fetch from backend, set up a fetch router for search in backend. Render the movie list.

● It should also have functionality for setting movies as your favourites, maybe with a star symbol in the table.
When clicking the favourite button. add the favourite movie(ID) to local storage as an array.
When clicking clicking the favorite list button. Fetch the favouritesIDs, check that the favourite exists in the movie list and render them
It should also check if a movie has been favouritized, animate it.
If a been favved then it should have a colour that signiifies that. 
Local storage in browser! Or session storage?
window.localstorage


● A list where you can add movies you want to watch, like the “watch later” functionality on YouTube.
Same as favourites

● Make Sure to test the application and write the tests in the Repo.
Yes

● The App Must Be working on desktop as well as mobile.
Yes

● Posters and trailers are always nice, this is however up to you.(Optional)
Find the right endpoint to get the trailers. 
And should be able to play the trailer.
Find the right component in npmjs to render a youtube trailer.
Should render all trailers for that movie.

https://www.youtube.com/watch?v=OsI3mSgTFnk
v=key
{
	"id": 628,
	"results": [
		{
			"iso_639_1": "en",
			"iso_3166_1": "US",
			"name": "Original Theatrical Trailer",
			"key": "qmFYu8x46VY",
			"site": "YouTube",
			"size": 360,
			"type": "Trailer",
			"official": true,
			"published_at": "2014-07-09T00:14:17.000Z",
			"id": "5dd31b9857d3780015dc9ce8"
		},
		{
			"iso_639_1": "en",
			"iso_3166_1": "US",
			"name": "New Companion",
			"key": "OsI3mSgTFnk",
			"published_at": "2011-05-27T03:38:26.000Z",
			"site": "YouTube",
			"size": 720,
			"type": "Clip",
			"official": false,
			"id": "5ae269d90e0a262a5e0220a9"
		},
		{
			"iso_639_1": "en",
			"iso_3166_1": "US",
			"name": "Forever Young",
			"key": "LIm8HfwnmVE",
			"published_at": "2011-05-27T03:37:53.000Z",
			"site": "YouTube",
			"size": 720,
			"type": "Clip",
			"official": false,
			"id": "5ae26973c3a36876a701ea07"
		},
		{
			"iso_639_1": "en",
			"iso_3166_1": "US",
			"name": "Master and Apprentice Scene",
			"key": "qsJ6BdQuUxo",
			"published_at": "2011-05-27T03:37:50.000Z",
			"site": "YouTube",
			"size": 720,
			"type": "Clip",
			"official": false,
			"id": "5ae2695e92514128c300705d"
		},
		{
			"iso_639_1": "en",
			"iso_3166_1": "US",
			"name": "Becoming A Vampire",
			"key": "c9cV7bFKMNQ",
			"published_at": "2011-05-27T03:37:30.000Z",
			"site": "YouTube",
			"size": 720,
			"type": "Clip",
			"official": false,
			"id": "5ae2693cc3a368767e023d23"
		},
		{
			"iso_639_1": "en",
			"iso_3166_1": "US",
			"name": "Back from the Dead",
			"key": "5xzDAgFrnf8",
			"published_at": "2011-05-27T03:37:07.000Z",
			"site": "YouTube",
			"size": 720,
			"type": "Clip",
			"official": false,
			"id": "5ae269aa0e0a26322d007818"
		}
	]
}

● Last but definitely NOT least, please include a Demo for us to see.
heroku

