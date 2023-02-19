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
- Components placeholder when page is loading

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

● Last but definitely NOT least, please include a Demo for us to see.
heroku


Nanis changes:

[x] Movie.tsx -> changed structure in return. added btn className='watch-trailer-btn'
[x] index.html -> added link to google fonts in head

Left TODO:
[] Export scss color variabels to seperate file
[x] HTML/SCSS-classes for dropdown. Ex dropdown header + dropdown title??????
[] Last page and first page (M0vies.tsx)

Desktop:
[] fix size watch trailer & watch later btns
[] fix layouot

Frudds FIXME:
[] fix watch trailer-btn. There is a "button.watch-trailer-btn.active" in index.scss for the btn.
[] fix poster size in mobile & desktop mode

footer:
[] fix symbols e.g fontAwesome -> position pin in footer
[] fix link to github & linked

