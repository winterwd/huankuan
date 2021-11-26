// eMailOAuth

const { Client } = require('yapople')

function popClient(username, password) {
  // winter.wd@qq.com
  let splits = username.split('@')
  let host = 'pop' + splits[1]
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

export const eMailOAuth = (authInfo, callback = (res) => {}) => {
  var {account, password} = authInfo
  if (password.length == 0 || !account.has('@')) {
    callback(null)
    return
  }

  var client = new Client(popClient(account, password));

  (async () => {
    await client.connect();
    const messages = await client.retrieveAll();
    messages.forEach((message) => {
      console.log(message.subject);
    });
  })().catch(console.error);
};

// eMailOAuth.prototype.connect = function(callback) {
// //   (async () => {
// //     await client.connect();
// //     const messages = await client.retrieveAll();
// //     messages.forEach((message) => {
// //       console.log(message.subject);
// //     });
// //     await client.quit();
// // })().catch(console.error);
//   await this.client.connect()
//   const messages = await this.client.retrieveAll();
// }