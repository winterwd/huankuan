const cloud = require('wx-server-sdk')
cloud.init()

function smtpConfig(user, pass) {
  // winter.wd@qq.com
  // host: smtp.qq.com; port: 465
  let splits = user.split('@')
  let host = 'smtp.' + splits[1]
  return { 
    host, 
    port: 465,
    secure: true, 
    auth: {user, pass}
   }
}

exports.main = async (event, context) => {
  let account = event.account
  let password = event.password
  if (password.length < 3 || !account.includes('@') || !account.includes('.com')) {
    return null
  }
  const nodemailer = require("nodemailer")
  let transporter = nodemailer.createTransport(smtpConfig(account, password))

  let message = {
    from: event.account,
    to: event.to,
    subject: event.subject,
    text: event.text,
    html: event.html
  }

  let res = await transporter.sendMail(message)
  return res
}