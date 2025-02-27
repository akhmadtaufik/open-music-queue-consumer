const nodemailer = require("nodemailer");
const process = require("process");

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(targetEmail, content) {
    const message = {
      from: "OpenMusic <no-reply@openmusic.com>",
      to: targetEmail,
      subject: "Ekspor Playlist",
      text: `Hasil ekspor playlist:\n\n${JSON.stringify(content, null, 2)}`,
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
