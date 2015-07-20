// test
const test = require('tape')
// server
const multilevel = require('multilevel')
const net = require('net')
const level = require('level-mem')
// client
const quickMulti = require('../index.js')


// setup server

var db = level('w00t')

net.createServer(function (con) {
  con.pipe(multilevel.server(db)).pipe(con)
}).listen(3000)

// setup client

var remoteDb = quickMulti('localhost:3000', 'testDB')

test(function(t){
  t.plan(4)

  var testKey = 'test'
  var testValue = '123'

  remoteDb.put(testKey, testValue, function(err){
    t.notOk(err, 'there was no error')
    t.ok(true, 'did finish put')
    remoteDb.get(testKey, function(err, result){
      t.notOk(err, 'there was no error')
      t.equal(testValue, result, 'value roundtripped correctly')
      t.end()
      process.exit()
    })
  })
})