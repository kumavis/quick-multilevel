const net = require('net')
const duplexify = require('duplexify')
const multilevel = require('multilevel')

module.exports = quickMulti


function quickMulti(target, label) {
  var db = multilevel.client()
  var dbStream = db.createRpcStream()
  var duplex = tryConnect(target, label)
  duplex.pipe(dbStream).pipe(duplex)
  return db
}

function tryConnect(target, label){
  var params = target.split(':')
  var host = params[0]
  var port = params[1]

  if (label) console.log('connection ('+label+') initializing...', target)
  
  var duplex = duplexify()
  establishConnection()
  
  return duplex
  
  function establishConnection(){
    var transport = net.connect({ host: host, port: port })
    transport.on('error', function(err){
      if (label) console.log('connection ('+label+') err:', err.message, '\nretrying...')
      setTimeout(establishConnection, 500)
    })
    duplex.setReadable(transport)
    duplex.setWritable(transport)
  }
}