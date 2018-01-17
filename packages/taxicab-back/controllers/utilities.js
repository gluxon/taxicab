const Router = require('koa-router')
const body = require('koa-body')

const router = new Router()
router.prefix('/utilities')

router.get('/', async ctx => {
  ctx.body = await ctx.db.utility.findAll()
})

router.post('/', body({ multipart: true }), async ctx => {
  const { code, description } = ctx.request.body.fields
  const utility = await ctx.db.utility.create({ code, description })

  ctx.status = 201 // created
  ctx.set({ Location: `/api/utilities/${utility.id}` })
})

router.param('utility', async (id, ctx, next) => {
  ctx.utility = await ctx.db.utility.findById(id)
  if (!ctx.utility) {
    ctx.status = 404
    return
  }
  await next()
})

router.get('/:utility', async ctx => {
  ctx.body = ctx.utility
})

router.put('/:utility', body({ multipart: true }), async ctx => {
  const { code, description } = ctx.request.body.fields
  ctx.utility.description = description
  ctx.utility.code = code
  await ctx.utility.validate()
  await ctx.utility.save()
  ctx.status = 201
  ctx.set({ Location: `/api/utilities/${ctx.utility.id}` })
})

router.delete('/:utility', async ctx => {
  await ctx.utility.destroy()
  ctx.status = 204
})

module.exports = router
