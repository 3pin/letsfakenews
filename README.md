Lets Fake News: web-app
//
In Development...
//
The first web-interface asks a client for a title and then series of phrases that make up a 'fake-news' report.
The server (run locally @ localhost:5000)
  parses the story down to its nouns
  runs a google-image-search per noun with resulting URLS
  saves the title, story, nouns:URLS to database
//
The second web-interface (@ route /display) is continuously picking entries from the database and with that info and a saved movie-file of a news-report.
  renders the opening title (title)
  composites scrolling-text (story) over the movie-file
  composites relevant images (URLs) when the matching text scrolls onto screen
To run the /display in fullscreen click on the region where you see the pop-up title appear
