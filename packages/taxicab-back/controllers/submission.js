const Router = require('koa-router')

const router = new Router()
router.prefix('/submissions')

router.param('submission', async (id, ctx, next) => {
  ctx.submission = await ctx.db.submission.findById(id)
  if (!ctx.submission) {
    ctx.status = 404
    return
  }
  await next()
})

router.get('/:submission', async ctx => {
  ctx.body = {
    ...ctx.submission.toJSON(),
    earned: ctx.submission.earned(),
    total: ctx.submission.total()
  }
})

router.get('/:submission/results', async ctx => {
  if (ctx.submission.status === 'pending') {
    await ctx.submission.execute()
  }

  ctx.body = await ctx.submission.getResults({ include: [ctx.db.test] })
})

router.get('/:submission/tests', async ctx => {
  ctx.body = await ctx.submission.getTests()
})

router.delete('/:submission', async ctx => {
  await ctx.submission.destroy()
  ctx.status = 204
})

module.exports = router
