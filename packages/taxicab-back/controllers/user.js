const Router = require('koa-router')
const router = new Router()

const createCASMiddleware = require('koa-cas-auth')
const cas = createCASMiddleware({ server: 'https://login.uconn.edu' })

router.prefix('/user')

router.get('/login', async ctx => {
  ctx.redirect('/')
})

const logout = cas.logout({
  deleteUser: ctx => ctx.cookies.set('user', null, { signed: true }),
  logoutUniversally: false
})
router.get('/logout', logout, async ctx => {
  ctx.redirect('/')
})

router.param('user', async (id, ctx, next) => {
  ctx.user = await ctx.db.user.findById(id)
  if (!ctx.user) {
    ctx.status = 404
    return
  }
  return next()
})

router.get('/:user', async ctx => {
  ctx.body = ctx.user
})

module.exports = router
