// eMailOAuth

// const { nodemailer } = require('nodemailer')

function transport(user, pass) {
  // winter.wd@qq.com
  let splits = user.split('@')
  let host = 'smtp.' + splits[1]
  return {
    host,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {user, pass}
  }
}

export const eMailOAuth = (authInfo, callback = (res) => {}) => {
  var {account, password} = authInfo
  if (password.length == 0 || !account.has('@')) {
    callback(null)
    return
  }

  // let transporter = new nodemailer.createTransport({account,password});
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