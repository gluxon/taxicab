module.exports = async (ctx, next) => {
  const netid = ctx.cookies.get('user', { signed: true })
  try {
    const [ user ] = await ctx.db.user.findOrCreate({ where: { netid } })
    ctx.user = user
  } catch (_) {
    // Because we couldn't find the user or create them
    ctx.status = 401 // unauthorized
    return
  }
  await next()
}
