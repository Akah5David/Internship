module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendmail",
      settings: {
        defaultFrom: env("DEFAULT_FROM_EMAIL"),
        defaultReplyTo: env("DEFAULT_REPLY_TO_EMAIL"),
      },
    },
  },
});

// module.exports = ({ env }) => ({
//   email: {
//     config: {
//       provider: "smtp",
//       providerOptions: {
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//           user: "davidakah1999@gmail.com", // your gmail
//           pass: env("GMAIL_APP_PASSWORD"), // pulled from .env
//         },
//       },
//       settings: {
//         defaultFrom: "davidakah1999@gmail.com", // must match Gmail
//         defaultReplyTo: "eliasakah1999@gmail.com",
//       },
//     },
//   },
// });
