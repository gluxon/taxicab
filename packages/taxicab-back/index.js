require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-router')
const crypto = require('crypto')
const db = require('./models')
const session = require('koa-session')
const createCASMiddleware = require('koa-cas-auth')
const csrf = require('koa-csrf-header')

const requireLogin = require('./middleware/requireLogin')
const controllers = require('./controllers')

const app = new Koa()

app.keys = [(process.env.APP_KEY || crypto.randomBytes(256))]
app.proxy = process.env.NODE_ENV === 'development'

db.sequelize.sync() // Create tables that do not exist yet.
app.context.db = db

app.use(session(app))

const router = new Router()
router.prefix('/api')

const cas = createCASMiddleware({ server: 'https://login.uconn.edu' })
const credentialRequestor = cas.credentialRequestor({
  renew: true,
  setUser: (ctx, user) => {
    ctx.cookies.set('user', user, { signed: true, httpOnly: false })
    ctx.db.user.findOrCreate({ where: { netid: user } })
  },
  getUser: ctx => ctx.cookies.get('user', { signed: true })
})

router.use(credentialRequestor)
router.use(requireLogin)

router.use(csrf({
  setToken: (token, ctx) => {
    ctx.session.csrfToken = token
    ctx.cookies.set('csrf-token', token, { signed: true, httpOnly: false })
  }
}))

for (const controller of Object.values(controllers)) {
  router.use(controller.routes(), controller.allowedMethods())
}

app.use(router.routes(), router.allowedMethods())

app.listen(process.env.LISTEN || 3000)
