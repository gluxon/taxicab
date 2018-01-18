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
    'dueDate'
  ]

  const solution = fields.solution || null
  const template = fields.template || null

  await ctx.assignment.update({
    ...pick(fields, assignableFields),
    solution,
    template
  })
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

router.get('/:assignment/submissions', async ctx => {
  const submissions = (ctx.user.role === 'TA' || ctx.user.role === 'Instructor')
    ? await ctx.assignment.getSubmissions()
    : await ctx.assignment.getSubmissions({ where: { userId: ctx.user.id } })

  const submissionsWithPoints = await Promise.all(
    submissions.map(async submission => {
      return {
        ...submission.toJSON(),
        earned: await submission.earned(),
        total: await submission.total()
      }
    })
  )

  ctx.body = submissionsWithPoints
})

router.post('/:assignment/submissions', body(bodyOptions), async ctx => {
  if (ctx.user.role === 'Student' && new Date() > ctx.assignment.dueDate) {
    ctx.status = 403
    return
  }

  if (!ctx.request.body.files.file) {
    ctx.throw(400, 'File required.')
    return
  }

  const code = await readFile(ctx.request.body.files.file.path)
  const submission = await ctx.db.submission.create({
    code: code.toString(),
    assignmentId: ctx.assignment.id,
    userId: ctx.user.id
  })

  ctx.status = 201 // created
  ctx.set({ Location: `/api/submissions/${submission.id}` })
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
