import settings from 'config';

const mailgun = require('mailgun-js');
const htmlToText = require('html-to-text');

const from = settings.emailFrom;

class Mailer {
	constructor() {
		this.mailgun = mailgun({ 
			apiKey: settings.mailgun.apiKey,
			domain: settings.mailgun.domain
		});
	}
	send({ 
		to,
		subject,
		text,
		attachment
	}) {
		const PlainText = htmlToText.fromString(text);
		const data = {
			from: `${settings.titleProject} <${from}>`,
			to,
			subject,
			text: PlainText,
			html: this.template(text)
		};
		if (attachment) {
			data.attachment = attachment;
		}
		this.mailgun.messages().send(data, (err) => {
			if (err) { return console.log('mailer error', err); }
			return false;
		});
	}
	static template(body) {
		/* eslint-disable */
		if (body) {
			body = body.replace(/(?:\r\n|\r|\n)/g, '<br />');
		}
		let strVar="";
		strVar += " <div width=\"100%\" style=\"font-family: Arial,Helvetica Neue,Helvetica,sans-serif; background: #ededed; padding: 50px 20px; color: #333333;\">";
		strVar += "            <div style=\"font-family: Arial,Helvetica Neue,Helvetica,sans-serif; max-width: 700px;  color: #333333;margin: 0px auto; font-size: 16px\">";
		strVar += "                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: Arial,Helvetica Neue,Helvetica,sans-serif; color: #333333; width: 100%;   line-height: 1.5;margin-bottom: 20px\">";
		strVar += "                    <tbody><tr>";
		strVar += "                        <td style=\"vertical-align: top;\">";
		strVar += "                            <img src=\"https://gallery.mailchimp.com/662cdd575c630a3f8512076b2/images/61439985-96ac-4ba9-a428-6596896588b9.png\" alt=\"Meetpacking\" style=\"height: 40px\">";
		strVar += "                        <\/td>";
		strVar += "                    <\/tr>";
		strVar += "                <\/tbody><\/table>";
		strVar += "                <div style=\"font-family: Arial,Helvetica Neue,Helvetica,sans-serif; padding: 32px 32px 32px 32px;  color: #333333;background: #fff; border-radius: 8px;\">";
		strVar += "                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%\";>";
		strVar += "                        <tbody><tr>";
		strVar += "                            <td>";
		strVar += "                                <p style=\"font-family: Arial,Helvetica Neue,Helvetica,sans-serif;  line-height: 1.5;color: #333333;\">"+body+"<\/p><br\/>";
		strVar += "                                <p style=\"font-family: Arial,Helvetica Neue,Helvetica,sans-serif;  line-height: 1.5; color: #333333; \">Meet short and prosper,<br\/>The "+settings.titleProject+" team<\/p>";
		strVar += "                            <\/td>";
		strVar += "                        <\/tr>";
		strVar += "                        <\/tbody>";
		strVar += "                    <\/table>";
		strVar += "                <\/div>";
		strVar += "            <\/div>";
		strVar += "        <\/div>";
		return strVar;
		/* eslint-enable */
	}
}

export default new Mailer();
