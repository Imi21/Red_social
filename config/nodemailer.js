const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 465,
secure: true,
auth: {
user: 'kokoloko_3@msn.com',
pass: 'yurinka'
}
});

module.exports = transporter;