import arcjet, { detectBot, protectSignup, shield, slidingWindow, validateEmail } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    //protect sign up form
    protectSignup({
      email: {
        mode: "LIVE",
        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },
      bots: {
        mode: "LIVE",
        allow: [],
      },
      rateLimit: {
        mode: "LIVE",
        interval: "10m",
        max: 300,
      },
    }),
  ],
});

export const loginRules = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ['ip.src'],
  rules:[
    validateEmail({
      mode: 'LIVE',
      block: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS']
    }),
    shield({
      mode:'LIVE'
    }),
    detectBot({
      mode: 'LIVE',
      allow: []
    }),
    slidingWindow({
      mode: 'LIVE',
      interval: '10m',
      max: 200,

    })
  ]

})

export default aj;
