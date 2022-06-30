var amqp = require('amqplib');
amqp.connect('amqp://guest:guest@47.104.141.127:15672').then(function (conn) {
  process.once('SIGINT', function () {
    conn.close();
  })
  return conn.createChannel().then(function (ch) {

    var ok = ch.assertQueue('hello', {durable: false});

    ok = ok.then(function (_qok) {
      return ch.consume('hello', function (msg) {
        console.log(' [x] Recived "%s" ', msg.content.toString());
      }, { noAck: true });
    });

    return ok.then(function (_consumeOK) {
      console.log(' [*] Waiting for messge. To exit press CTRL+C');
    })
  })
}).then(null, console.warn)
