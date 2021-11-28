const cloud = require('wx-server-sdk')
const { Client } = require('yapople')

cloud.init()
function pop3Config(username, password) {
  // winter.wd@qq.com
  // host: pop.qq.com; port: 995
  let splits = username.split('@')
  let host = 'pop.' + splits[1]
  return {
    host,
    port: 995,
    tls: true,
    mailparser: true,
    username,
    password,
    options: {
      secureContext: {
        passphrase: "passphrase"
      }
    }
  }
}

popRetrieveAll = async (client) => {
  const messages = await client.retrieveAll()
  return messages
}

exports.main = async (event, context) => {
  let account = event.account
  let password = event.password
  if (password.length < 3 || !account.includes('@') || !account.includes('.com')) {
    return null
  }
  let config = pop3Config(account, password)
  console.log('pop config: ', config)
  const client = new Client(config)
  await client.connect()
  return client.connected

  // var err = await client.connect()
  // if (err) {
  //   console.log('connect: ', err)
  //   return err
  // }
  // const messages = await popRetrieveAll(client)
  // messages.forEach((message) => {
  //   console.log(message.subject)
  // })
  // return messages
}