Project name: DietDine
Render client link: https://diet-dine-client.onrender.com/
Render sever link: https://diet-dine-server.onrender.com/
GitHub repo link: https://github.com/rlefevre6505-mh/assignment-week5

Team members: Amy Tuck, Richard Lefevre, Ulrike Kunze

# Project description:

A site which allows searching for restaurants catering for various dietary requirements and accessibility needs. If a restaurant is not featured, users are able to submit restaurants.

# Problem domain: 

Providing a map of suitable restaurants/cafe’s or pubs in local areas for those with specific dietary requirements.

# User stories:

As a user, I want to be able to find a range of restaurants in my local area to suit my dietary needs
As a user, I would like to be able to select multiple options according to my needs
As a user, I want to be able to view the menu of a selected restaurant and all reviews that have been left
As a developer, I want to be able to test a minimum of 3 local areas with the map
As a user, I want to be able to add restaurants 
As a user, I want to be able to see what dietary requirements a restaurant meets easily with a system of clear icons

# Wireframe:

https://www.figma.com/board/K7zV3wwWYGAJP68uhAR14j/Group-4-TE-assignment-Week-5?node-id=103-534&t=qVPruAPkdfx7Nvg7-4

# Libraries, Frameworks, API’s

Vite
Express
PG
Cors
leafletJS
Openstreetmap

# Instructions on how to run your app:

App automatically moves to user’s current location (if permission granted)
Displays all restaurants available that were submitted with dietary requirements 
The user is able to filter restaurants through a button at the top
The user can submit restaurants with their relevant dietary requirements

# Lighthouse report:

Performance 99%
Accessibility 100%
Best Practices 88% requests geolocation on load, lower than ideal image resolution (mostly in the LeafletJS map) browser errors logged to console (all from LeafletJS map)
SEO 100%

# WAVE

4 errors flagged, all for missing or orphaned labels (2 due to hiddeninouts used to process location data, and 2 possibly due to use of underscores in the name value)

# Reflections:

We achieved all requirements for this project and deployed a fully-functioning website on Render,com ahead of the deadline. The main areas of difficulty we encountered were in Javascript logic, making APIs work as intended and manipulating data to achieve desired results.

Goals we did not achieve were:

- use of colour-coded icons in the map pop-ups to indicate dietary requirements catered to. The main difficulty was time contrains, as this was attempted toward the end of the timeline. This was abandoned, wiht text based infomration in place for now.

- implementing extra pages for information about the site and sumitting forms. The difficulty was in understanding the instructions for creating multiple pages in Vite, as these were followee carefully, but the additional page did not deploy successfully to Render.com. Thisd was abandoned in favour of pop-in panels on the main page.

- create filtering that allows multiple dietary requirements to be filtered simultaneously. The difficulty with this was creating the correct logic in Javascript and time constraints. This was re-worked into a system in which 1 filter can be selected at a time, with users able to view further information on each restaurant left after filtering.

- use the opentable API to auto-populate restaurnats to the map. This proved difficultin the time allocated.

What went well:

Implementing the map API and adding location markers, with pop-up info boxes was relatively quick and easy initially. Setting up the server and database also went well, as did the basic structure of the page. The page now has clean intuitive UI and clear user journey, with the map taking up most of the screen in any view, drawing users' focus to it, and a minimal selection of buttons and options. The functionality of the page in terms of loading data and displaying on the map, filtering and adding new data to the database which can be immediately displayed on the map have all worked well. This was all supported by good project planning andf cooperation.

Resources that were used included Leaflets API documentation, numerous MDN and W3 Pages, a few posts on Stack Overflow (for filtering and adding checkboxes and certain attributes to the DOM) and a few Youtube videos (for refining geolocation features).

Bugs encountered included included numerous issues caused by errors in the use of scope, case sensetivity for values of some DOM elements, errors thrown by the Leaflets map API.

References:
Vite
Express
PG
Cors
leafletJS
Openstreetmap
Copilot (for logo generation)
