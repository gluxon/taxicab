import React from 'react'
import { Form, Input, InputNumber, Radio, Button } from 'antd'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 }
}

class TestEditor extends React.Component {
  state = { uploading: false }
  timers = []

  componentWillUnmount () {
    for (const timer of this.timers) {
      clearTimeout(timer)
    }
  }

  handleSubmit = e => {
    const { test, form, createTestForAssignment, updateTest, onError, onSuccess } = this.props
    e.preventDefault()

    form.validateFields((err, fieldValues) => {
      if (err) return

      const editMode = test && (test.id !== undefined)

      const submitFunction = editMode
        ? payload => updateTest(test.id, payload)
        : createTestForAssignment

      this.setState({ uploading: true })
      submitFunction(fieldValues)
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
    const { test, form, onCancel } = this.props
    const { getFieldDecorator } = form

    const name = test ? test.name : null
    const points = test ? test.points : 3
    const type = test ? test.type : 'match'
    const functionName = test ? test.function : null
    const args = test ? test.arguments : null
    const code = test ? test.code : null

    return <Form hideRequiredMark onSubmit={this.handleSubmit}>
      <Name {...{getFieldDecorator, initialValue: name}} />
      <Points {...{getFieldDecorator, initialValue: points}} />
      <TestType {...{getFieldDecorator, initialValue: type}} />
      <FunctionName {...{getFieldDecorator, initialValue: functionName}} />
      <Arguments {...{getFieldDecorator, initialValue: args}} />
      <AssertCode {...{getFieldDecorator, initialValue: code}} />
      <CancelSubmit loading={this.state.uploading} onCancel={onCancel} />
    </Form>
  }
}

const Name = ({ getFieldDecorator, initialValue }) => {
  const fieldDecorator = getFieldDecorator('name', {
    initialValue,
    rules: [ { required: true, message: 'Enter a name' } ]
  })
  return <Form.Item {...formItemLayout} label='Name'>
    {fieldDecorator(<Input placeholder='1. nth-fib - small argument' />)}
  </Form.Item>
}

const Points = ({ getFieldDecorator, initialValue }) => {
  const fieldDecorator = getFieldDecorator('points', {
    initialValue,
    rules: [ { required: true, message: 'Enter a name' } ]
  })
  return <Form.Item {...formItemLayout} label='Points'>
    {fieldDecorator(<InputNumber placeholder='3' precision={0} />)}
  </Form.Item>
}

const TestType = ({ getFieldDecorator, initialValue }) => {
  const fieldDecorator = getFieldDecorator('type', {
    initialValue,
    rules: [ { required: true, message: 'Choose a test type' } ]
  })
  return <Form.Item {...formItemLayout} label='Test Type'>
    {fieldDecorator(<Radio.Group>
      <Radio.Button value='match'>Match Solution</Radio.Button>
      <Radio.Button value='assert' disabled>Assert Expression</Radio.Button>
    </Radio.Group>)}
  </Form.Item>
}

const FunctionName = ({ getFieldDecorator, initialValue }) => {
  const fieldDecorator = getFieldDecorator('function', {
    initialValue,
    rules: [
      { required: true, message: 'Enter a name.' }
    ]
  })

  return <Form.Item {...formItemLayout} hasFeedback label='Function Name'>
    {fieldDecorator(<Input placeholder='nth-fib' />)}
  </Form.Item>
}

const Arguments = ({ getFieldDecorator, initialValue }) => {
  const fieldDecorator = getFieldDecorator('arguments', { initialValue })
  return <Form.Item {...formItemLayout} label='Function Arguments'>
    {fieldDecorator(<Input placeholder='5' />)}
  </Form.Item>
}

const AssertCode = ({ getFieldDecorator, initialValue }) => {
  const fieldDecorator = getFieldDecorator('code', {
    initialValue,
    rules: [ { required: true, message: 'Assert code is required' } ]
  })
  return <Form.Item
    {...formItemLayout}
    required
    hasFeedback
    label='Assert Code'
    help={<p>Given <strong>student</strong> and <strong>solution</strong>, the above expression should evaluate to <strong>#t</strong>.</p>}
  >
    {fieldDecorator(<Input.TextArea
      style={{ fontFamily: 'monospace' }}
      autosize={{ minRows: 2, maxRows: 10 }}
      placeholder='Ex: (< (abs (- student solution)) 0.001)'
    />)}
  </Form.Item>
}

const CancelSubmit = ({ onCancel, loading }) =>
  <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
    { onCancel && <Button style={{ marginRight: '1em' }} onClick={onCancel}>Cancel</Button> }
    <Button type='primary' htmlType='submit' loading={loading}>Submit</Button>
  </Form.Item>

export default Form.create()(TestEditor)
