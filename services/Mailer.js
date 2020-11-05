const sendgrid = require("sendgrid");
const helper = sendgrid.mail;

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(process.env.SENDGRID_API_KEY);
    this.from_email = new helper.Email("mchangpi@gmail.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses = (recipients) => {
    return recipients.map(({ email }) => new helper.Email(email));
  };

  addClickTracking = () => {
    const settings = new helper.TrackingSettings();
    const click = new helper.ClickTracking(true, true);

    settings.setClickTracking(click);
    this.addTrackingSettings(settings);
  };

  addRecipients = () => {
    const personal = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personal.addTo(recipient);
    });
    this.addPersonalization(personal);
  };

  send = async () => {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });
    const response = await this.sgApi.API(request);
    return response;
  };
}

module.exports = Mailer;
