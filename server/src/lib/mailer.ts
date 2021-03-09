import previewEmail from 'preview-email';
import { createTransport } from 'nodemailer';
import { env, openEmailsInDev } from 'config';

const mailerSettings = env.production
  ? JSON.parse(process.env.SMTP_SETTING_JSON)
  : {
      jsonTransport: true,
    };

const mailer = createTransport(mailerSettings);
const defaultFrom = process.env.SMTP_FROM;

type Email = {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html: string;
};

type EmailWithId = Email & { id: number };

let emailId = 1;
export const sentEmailsForTests: EmailWithId[] = [];

export const sendMail = env.production
  ? ({ from = defaultFrom, to, subject, text, html }: Email) => {
      mailer.sendMail({ from, to, subject, text, html });
    }
  : (params: Email) => {
      const email: EmailWithId = {
        ...params,
        from: params.from || defaultFrom,
        id: emailId++,
      };

      sentEmailsForTests.push(email);

      previewEmail(email, { open: openEmailsInDev })
        .then((url) => {
          console.log(`Email "${email.subject} was sent to ${email.to}"`);
          console.log(url);
        })
        .catch(console.error);
    };
