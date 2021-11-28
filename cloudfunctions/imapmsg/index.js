const cloud = require('wx-server-sdk')
const Imap = require('imap')
cloud.init()

function imapConfig(user, password) {
  // winter.wd@qq.com
  // host: imap.qq.com; port: 993
  let splits = user.split('@')
  let host = 'imap.' + splits[1]
  return { 
    host, 
    user, 
    password, 
    port: 993, 
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
   }
}

function connect(imap, cb) {
  (async => {
    await imap.connect()
    cb()
  })
}

exports.main = async (event, context) => {
  let account = event.account
  let password = event.password
  if (password.length < 3 || !account.includes('@') || !account.includes('.com')) {
    return null
  }
  let config = imapConfig(account, password)
  var imap = new Imap(config) 

  (async () => {
    await imap.connet()
    imap.open
  })
  // imap.openBox('INBOX', true, (err, box) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   else {
  //     console.log(box)
  //   }
  // })
}