const Router = require('koa-router')
const body = require('koa-body')
const { pick } = require('lodash')

const router = new Router()
router.prefix('/tests')

router.param('test', async (id, ctx, next) => {
  ctx.test = await ctx.db.test.findById(id)
  if (!ctx.test) {
    ctx.status = 404
    return
  }
  await next()
})

router.get('/:test', async ctx => {
  ctx.body = ctx.test
})

router.put('/:test', body({ multipart: true }), async ctx => {
  const assignableFields = [
    'name',
    'points',
    'type',
    'function',
    'arguments',
    'code'
  ]
  const test = await ctx.test
    .update(pick(ctx.request.body.fields, assignableFields))
  ctx.status = 201
  ctx.set({ Location: `/api/tests/${test.id}` })
})

router.delete('/:test', async ctx => {
  await ctx.test.destroy()
  ctx.status = 204
})

module.exports = router
