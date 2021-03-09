const { config } = require('dotenv')
config({ path: '../.env' }) // common config

if (process.env.NODE_ENV !== 'production') require('@cypress/instrument-cra')

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
}
