module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'mailgun',
        providerOptions: {
          apiKey: env('MAILGUN_API_KEY'),
          domain: env('MAILGUN_DOMAIN'),
        },
        settings: {
          defaultFrom: 'mailgun@sandboxd398ed80cccf4ecf884880d9e711a3ef.mailgun.org',
          defaultReplyTo: 'mailgun@sandboxd398ed80cccf4ecf884880d9e711a3ef.mailgun.org',
        },
      },
    },
  });
  