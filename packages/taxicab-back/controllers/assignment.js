const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const Router = require('koa-router')
const body = require('koa-body')
const { pick } = require('lodash')

const readFile = promisify(fs.readFile)

const router = new Router()

const uploadsDir = path.join(__dirname, '../uploads')

router.prefix('/assignments')

router.get('/', async ctx => {
  ctx.body = await ctx.db.assignment.findAll()
})

const bodyOptions = { multipart: true }

router.post('/', body(bodyOptions), async ctx => {
  const { fields, files } = ctx.request.body

  const assignableFields = [
    'name',
    'startDate',
    'dueDate',
    'solution',
    'template'
  ]

  const assignment = await ctx.db.assignment
    .create(pick(fields, assignableFields))
  if (files.description) {
    await assignment.setupDescriptionFile(files.description.path)
    await assignment.save()
  }

  ctx.status = 204
})

router.param('assignment', async (id, ctx, next) => {
  ctx.assignment = await ctx.db.assignment.findById(id)
  if (!ctx.assignment) {
    ctx.status = 404
    return
  }
  await next()
})

router.get('/:assignment', async ctx => {
  ctx.body = ctx.assignment
})

router.patch('/:assignment', body(bodyOptions), async ctx => {
  const { fields, files } = ctx.request.body

  const assignableFields = [
    'name',
    'startDate',
    'dueDate',
    'solution',
    'template'
  ]

  await ctx.assignment.update(pick(fields, assignableFields))
  if (files.description) {
    await ctx.assignment.replaceDescriptionFile(files.description.path)
    await ctx.assignment.save()
  }

  ctx.status = 204
})

router.delete('/:assignment', async ctx => {
  await ctx.assignment.destroy()
  ctx.status = 204
})

router.get('/:assignment/description', async ctx => {
  const filename = ctx.assignment.name + '.pdf'
  ctx.response.set('Content-Disposition', `inline; filename="${filename}"`)
  ctx.response.set('Content-Type', 'application/pdf')
  ctx.body = fs.createReadStream(path.join(uploadsDir, `${ctx.assignment.id}.pdf`))
})

router.post('/:assignment/submissions', body(bodyOptions), async ctx => {
  const netid = ctx.cookies.get('user', { signed: true })
  try {
    const [ user ] = await ctx.db.user.findOrCreate({ where: { netid } })
    const data = await readFile(ctx.request.body.files.file.path)
    await ctx.db.submission.create({
      code: data,
      assignmentId: ctx.assignment.id,
      userId: user.id
    })
  } catch (err) {
    console.error(err)
    ctx.status = 500
    return
  }
  ctx.status = 200
})

router.get('/:assignment/tests', async ctx => {
  ctx.body = await ctx.db.test.findAll({
    where: { assignmentId: ctx.assignment.id }
  })
})

router.post('/:assignment/tests', body(bodyOptions), async ctx => {
  const assignableFields = [
    'name',
    'points',
    'type',
    'function',
    'arguments',
    'code'
  ]
  const test = await ctx.db.test.create({
    ...pick(ctx.request.body.fields, assignableFields),
    assignmentId: ctx.assignment.id
  })
  ctx.status = 201 // created
  ctx.set({ Location: `/api/tests/${test.id}` })
})

module.exports = router
