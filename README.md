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
