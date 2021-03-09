import 'dotenv/config'

export default (on, config) => {
  config.baseUrl = process.env.FRONTEND_URL
  config.env.FRONTEND_URL = process.env.FRONTEND_URL
  config.env.API_URL = process.env.API_URL
  config.env.codeCoverage = {
    url: `${process.env.API_URL}/tests/__coverage__`
  }

  require('@cypress/code-coverage/task')(on, config)

  return config
}
