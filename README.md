# Hypothes.is Work Simulation Exercise

Usage:

```
make
python -m SimpleHTTPServer 8000
```

View sample annotations by navigating to http://localhost:8000 .

View annotations for a given tag, URL or user by appending a search query to the URL. The parameters are passed to Hypothes.is' [search API](http://h.readthedocs.org/en/latest/api.html#search).

http://localhost:8000/#uri=http://www.nytimes.com/2013/10/13/magazine/all-is-fair-in-love-and-twitter.html

http://localhost:8000/#tags=Silicon%20Valley

http://localhost:8000/#user=robertknight

## Tests

Tests are implemented with mocha and chai using React's shallow rendering functionality.
Run with:

```
npm test
```

## Sharing Functionality

I implemented an improved version of the link sharing functionality
on the current Hypothes.is website.

The main enhancement is to make copying links more convenient by
automatically copying the link to the clipboard where possible
and saving the user needing to press Ctrl/Cmd+C or right-click and copy.

This requires a current stable version of Chrome or dev version of Firefox,
otherwise there is a fallback to providing the user with guidance.

_I went down this route rather than
'Share to Twitter/Facebook' as I personally would find this more useful.
I'd suggest that really great Share-to-Network-X functionality needs
integration with Via so that the link shows the user the annotations
in context._
