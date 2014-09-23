connect-bookshelf
=================

connect-bookshelf is a session store for express/connect using Bookshelf.js

Usage
-----

```js
var express = require('express'),
    session = require('express-session'),
    BookshelfStore = require('connect-bookshelf')(session);

app = express();

app.use(session({
  store: new BookshelfStore({model: aBookshelfModel}),
  secret: 's3cr3t'
}));
```

Where `aBookshelfModel` is a model with columns something like:

 * `id`, integer, primarykey
 * `sid`, string, unique
 * `data`, string

