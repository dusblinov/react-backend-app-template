'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mailgun = require('mailgun-js');
var htmlToText = require('html-to-text');
var from = _config2.default.emailFrom;

var Mailer = function () {
	function Mailer() {
		_classCallCheck(this, Mailer);

		this.mailgun = mailgun({ apiKey: _config2.default.mailgun.apiKey, domain: _config2.default.mailgun.domain });
	}

	_createClass(Mailer, [{
		key: 'send',
		value: function send(_ref) {
			var to = _ref.to,
			    subject = _ref.subject,
			    text = _ref.text,
			    attachment = _ref.attachment;

			var PlainText = htmlToText.fromString(text);
			var data = {
				from: _config2.default.titleProject + ' <' + from + '>',
				to: to,
				subject: subject,
				text: PlainText,
				html: this.template(text)
			};
			if (attachment) {
				data.attachment = attachment;
			}
			this.mailgun.messages().send(data, function (err, body) {
				if (err) {
					return console.log('mailer error', err);
				}
				return false;
			});
		}
	}, {
		key: 'template',
		value: function template(body) {
			if (body) {
				body = body.replace(/(?:\r\n|\r|\n)/g, '<br />');
			}
			var strVar = "";
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
			strVar += "                                <p style=\"font-family: Arial,Helvetica Neue,Helvetica,sans-serif;  line-height: 1.5;color: #333333;\">" + body + "<\/p><br\/>";
			strVar += "                                <p style=\"font-family: Arial,Helvetica Neue,Helvetica,sans-serif;  line-height: 1.5; color: #333333; \">Meet short and prosper,<br\/>The " + _config2.default.titleProject + " team<\/p>";
			strVar += "                            <\/td>";
			strVar += "                        <\/tr>";
			strVar += "                        <\/tbody>";
			strVar += "                    <\/table>";
			strVar += "                <\/div>";
			strVar += "            <\/div>";
			strVar += "        <\/div>";
			return strVar;
		}
	}]);

	return Mailer;
}();

exports.default = new Mailer();