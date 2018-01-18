require('dotenv').config()

const Koa = require('koa')
const app = new Koa()

const crypto = require('crypto')
app.keys = [(process.env.APP_KEY || crypto.randomBytes(256))]

app.proxy = process.env.NODE_ENV === 'development'

const db = require('./models')
db.sequelize.sync() // Create tables that do not exist yet.
app.context.db = db

const session = require('koa-session')
app.use(session(app))

const Router = require('koa-router')
const router = new Router()
router.prefix('/api')

const createCASMiddleware = require('koa-cas-auth')
const cas = createCASMiddleware({ server: 'https://login.uconn.edu' })
const credentialRequestor = cas.credentialRequestor({
  renew: true,
  setUser: (ctx, user) => {
    ctx.cookies.set('user', user, {
      signed: true,
      // Setting httpOnly allows the JS frontend to read the currently logged
      // in user.
      httpOnly: false
    })
    ctx.db.user.findOrCreate({
      where: { netid: user }
    })
  },
  getUser: ctx => ctx.cookies.get('user', { signed: true })
})

const requireLogin = require('./middleware/requireLogin')

router.use(credentialRequestor)
router.use(requireLogin)

const csrf = require('koa-csrf-header')
router.use(csrf({
  setToken: (token, ctx) => {
    ctx.session.csrfToken = token
    ctx.cookies.set('csrf-token', token, {
      signed: true,
      httpOnly: false
    })
  }
}))

const controllers = require('./controllers')
for (const controller of Object.values(controllers)) {
  router.use(controller.routes(), controller.allowedMethods())
}

app.use(router.routes(), router.allowedMethods())

app.listen(process.env.LISTEN || 3000)
