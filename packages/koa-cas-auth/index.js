const https = require('https')
const { promisify } = require('util')
const xml2js = require('xml2js')
const parseString = promisify(xml2js.parseString).bind(xml2js)

function createCASMiddleware (options = {}) {
  const server = options.server
  const loginUrl = options.login || '/cas/login'
  const logoutUrl = options.logout || '/cas/logout'
  const validationUrl = options.validation || '/cas/serviceValidate'

  const errors = {
    noServerURL: new Error('The server option must be defined.')
  }

  if (!server) throw errors.noServerURL

  function credentialRequestor ({ renew, getUser, setUser }) {
    return async (ctx, next) => {
      const user = getUser(ctx)

      const userIsNotYetAuthenticated = !user && !ctx.request.query.ticket
      const pendingUserAuth = !user && ctx.request.query.ticket

      if (userIsNotYetAuthenticated) {
        const returnUrl = encodeURIComponent(ctx.request.href)
        ctx.redirect(server + loginUrl +
          '?service=' + returnUrl +
          (renew ? '&renew=true' : ''))
        return
      }

      if (pendingUserAuth) {
        const ticketArgStart = '?ticket=' + ctx.request.query.ticket
        const ticketArgMiddle = '&ticket=' + ctx.request.query.ticket
        let returnUrl = ctx.request.href.replace(ticketArgStart, '')
        returnUrl = returnUrl.replace(ticketArgMiddle, '')

        const requestUrl = server + validationUrl +
          '?service=' + encodeURIComponent(returnUrl) +
          '&ticket=' + ctx.request.query.ticket

        const res = await new Promise(resolve => https.get(requestUrl, resolve))
        let body = ''
        res.on('data', data => { body += data})
        await new Promise(resolve => res.on('end', resolve))
        const json = await parseString(body)

        const success = json['cas:serviceResponse']['cas:authenticationSuccess']
        if (success) {
          const user = success[0]['cas:user'][0]
          setUser(ctx, user)
        }

        // Redirect to the originally requested URL without the ticket param
        // so we don't keep sensitive information in the address bar.
        ctx.status = 308
        ctx.redirect(returnUrl)
        return
      }

      await next()
    }
  }

  function logout ({ deleteUser, logoutUniversally }) {
    return async (ctx, next) => {
      deleteUser(ctx)
      if (logoutUniversally) {
        ctx.redirect(server + logoutUrl +
          '?url=' + encodeURIComponent(ctx.request.href))
        return
      }
      await next()
    }
  }

  return {
    credentialRequestor,
    logout
  }
}

module.exports = createCASMiddleware
