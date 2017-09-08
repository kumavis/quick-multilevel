# quick-multilevel

[![Greenkeeper badge](https://badges.greenkeeper.io/kumavis/quick-multilevel.svg)](https://greenkeeper.io/)

succinctly open a remote levelDB instance over tcp with network retry.

```js
const quickMulti = require('quick-multilevel')

var db = quickMulti('localhost:9000', 'testDB')
db.get(key, cb)
```

### api

##### quickMulti(String target, [String label])

* target is 'host:port'.
* (optional) label for connection, if provided will log connection status.