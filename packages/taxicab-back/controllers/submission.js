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
  ctx.body = ctx.submission
})

router.get('/:submission/results', async ctx => {
  ctx.body = await ctx.submission.getResults()
})

router.delete('/:submission', async ctx => {
  await ctx.submission.destroy()
  ctx.status = 204
})

module.exports = router
