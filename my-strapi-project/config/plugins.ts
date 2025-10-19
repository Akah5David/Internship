module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendmail",
      providerOptions: {
        path: "/usr/sbin/sendmail", // confirm with `which sendmail`
        args: "-i", // optional
      },
      settings: {
        defaultFrom: env("DEFAULT_FROM_EMAIL"),
        defaultReplyTo: env("DEFAULT_REPLY_TO_EMAIL"),
      },
    },
  },
});
