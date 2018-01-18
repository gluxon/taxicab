// This package is temporary. This functionality should be available in
// koa-csrf. We need this because koa-csrf only validates through request bodies
// at the moment.

const Tokens = require('csrf')

module.exports = (opts = {}) => {
  const headerField = opts.headerField || 'X-CSRF-Token'
  const guardedMethods = opts.guardedMethods || ['POST']
  const invalidCSRFTokenMessage = opts.invalidCSRFTokenMessage || 'Invalid CSRF Token'

  const getToken = opts.getToken || (ctx => ctx.session.csrfToken)
  const setToken = opts.setToken || ((token, ctx) => { ctx.session.csrfToken = token })

  return async function csrf (ctx, next) {
    let token = getToken(ctx)

    if (!token) {
      const tokens = new Tokens()
      const secret = await tokens.secret()
      token = tokens.create(secret)
      setToken(token, ctx)
    }

    // We're assuming that the user gets the CSRF token on an initial GET
    // request that isn't guarded. This should prevent a situation where we
    // immediately reject the first request of a user since it has no CSRF
    // token.

    if (!guardedMethods.includes(ctx.method)) {
      return next()
    }

    if (ctx.request.get(headerField) !== token) {
      ctx.throw(403, invalidCSRFTokenMessage)
    }

    return next()
  }
}
