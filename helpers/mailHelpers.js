const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendMail = async ({ to, subject, body }) => {
	try {
		const msg = {
			to,
			from: process.env.SENDGRID_FROM,
			subject,
			text: body,
			html: `
                <div>
                    <h1>${subject}</h1>
                    <p>${body}</p>
                </div>
            `,
		};

		await sgMail.send(msg);
	} catch (error) {
		throw new Error('Error enviando email');
	}
};

module.exports = {
	sendMail,
};
