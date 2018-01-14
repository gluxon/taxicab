import React from 'react'
import { Form, Input, DatePicker, Upload, Icon, Button } from 'antd'
import moment from 'moment'
const RangePicker = DatePicker.RangePicker

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

class AssignmentEditor extends React.Component {
  state = { uploading: false }
  timers = []

  componentWillUnmount () {
    for (const timer of this.timers) {
      clearTimeout(timer)
    }
  }

  handleSubmit = e => {
    const { form, assignment, updateAssignment, createAssignment, onError, onSuccess } = this.props
    e.preventDefault()

    form.validateFields((err, fieldValues) => {
      if (err) return

      const payload = {
        name: fieldValues.name,
        startDate: fieldValues.duration[0].toDate(),
        dueDate: fieldValues.duration[1].toDate(),
        description: fieldValues.description && fieldValues.description[0],
        solution: fieldValues.solution,
        template: fieldValues.template
      }

      const editMode = assignment !== undefined

      const submitFunction = editMode
        ? updateAssignment
        : createAssignment

      this.setState({ uploading: true })
      submitFunction(payload)
        .then(res => {
          if (onSuccess) onSuccess(res)
        })
        .catch(err => {
          if (onError) {
            onError(err)
          } else {
            throw err
          }
        })
        .finally(() => {
          this.timers.push(setTimeout(() => {
            this.setState({ uploading: false })
          }, 500))
        })
    })
  }

  render () {
    const { form, assignment } = this.props
    const { getFieldDecorator } = form

    const name = assignment ? assignment.name : null
    const duration = assignment
      ? [ moment(assignment.startDate), moment(assignment.dueDate) ]
      : null
    const solution = assignment ? assignment.solution : null
    const template = assignment ? assignment.template : null

    const formComponent = <Form onSubmit={this.handleSubmit}>
      <Name getFieldDecorator={getFieldDecorator} initialValue={name} />
      <Duration getFieldDecorator={getFieldDecorator} initialValue={duration} />
      <Description getFieldDecorator={getFieldDecorator} />
      <Solution getFieldDecorator={getFieldDecorator} initialValue={solution} />
      <Template getFieldDecorator={getFieldDecorator} initialValue={template} />
      <Submit loading={this.state.uploading} />
    </Form>

    return formComponent
  }
}

const Name = ({ getFieldDecorator, initialValue }) => {
  const fieldDecorator = getFieldDecorator('name', {
    initialValue,
    rules: [
      { required: true, message: 'Enter a name.' },
      { max: 256, message: 'Maximum length is 256 characters.' },
      { whitespace: true, message: 'Enter more than just spaces.' }
    ]
  })

  return <Form.Item {...formItemLayout} hasFeedback label='Name'>
    {fieldDecorator(<Input placeholder='Name' />)}
  </Form.Item>
}

const Duration = ({ getFieldDecorator, initialValue }) => {
  const fieldDecorator = getFieldDecorator('duration', {
    initialValue,
    rules: [
      { required: true, message: 'Enter a date range' }
    ]
  })

  return <Form.Item {...formItemLayout} hasFeedback label='Duration'>
    {fieldDecorator(<RangePicker showTime format='YYYY-MM-DD HH:mm' />)}
  </Form.Item>
}

class Description extends React.Component {
  state = { fileList: [] }

  onRemove = file => {
    this.setState({ fileList: [] })
  }

  beforeUpload = file => {
    this.setState({ fileList: [file] })
    return false
  }

  render () {
    const { getFieldDecorator } = this.props
    const uploadProps = {
      accept: '.pdf',
      beforeUpload: this.beforeUpload,
      name: 'description',
      onRemove: this.onRemove,
      fileList: this.state.fileList,
      withCredentials: true
    }

    const fieldDecorator = getFieldDecorator('description', {
      getValueFromEvent: ev => ev.fileList
    })

    return <Form.Item {...formItemLayout} label='PDF Description'>
      {fieldDecorator(<Upload.Dragger {...uploadProps}>
        <p className='ant-upload-drag-icon'><Icon type='file-pdf' /></p>
        <p className='ant-upload-text'>Click or drag a file to this area to upload</p>
      </Upload.Dragger>)}
    </Form.Item>
  }
}

const Solution = ({ getFieldDecorator, initialValue }) =>
  <Form.Item {...formItemLayout} label='Solution'>
    {getFieldDecorator('solution', { initialValue })(<Input.TextArea
      autosize={{ minRows: 2, maxRows: 10 }}
      placeholder='Copy and paste the assignment solution here.'
      style={{ fontFamily: 'monospace' }}
    />)}
  </Form.Item>

const Template = ({ getFieldDecorator, initialValue }) =>
  <Form.Item {...formItemLayout} label='Template'>
    {getFieldDecorator('template', { initialValue })(<Input.TextArea
      autosize={{ minRows: 2, maxRows: 10 }}
      placeholder='Optionally provide starting code.'
      style={{ fontFamily: 'monospace' }}
    />)}
  </Form.Item>

const Submit = ({ getFieldDecorator, ...rest }) =>
  <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
    <Button type='primary' htmlType='submit' {...rest}>Submit</Button>
  </Form.Item>

export default Form.create()(AssignmentEditor)
