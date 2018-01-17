import React from 'react'
import { Form, Input, Button } from 'antd'
import DeleteButton from 'components/DeleteButton'
import inferNames from 'taxicab-scheme-infer-names'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

class UtilityEditor extends React.Component {
  state = { uploading: false, inferredName: null }
  timers = []

  componentWillUnmount () {
    for (const timer of this.timers) {
      clearTimeout(timer)
    }
  }

  handleSubmit = e => {
    const { utility, form, createUtility, updateUtility, onError, onSuccess } = this.props
    e.preventDefault()

    form.validateFields((err, fieldValues) => {
      if (err) return

      const editMode = utility && (utility.id !== undefined)

      const submitFunction = editMode
        ? payload => updateUtility(utility.id, payload)
        : createUtility

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

  onCodeChange = ev => {
    const { updateUtilityName } = this.props
    if (!updateUtilityName) return
    const names = [...inferNames(ev.target.value)]
    updateUtilityName(names.length > 0 ? names[0] : '?')
  }

  render () {
    const { utility, form, onCancel, onDelete } = this.props
    const { getFieldDecorator } = form

    const description = utility ? utility.description : null
    const code = utility ? utility.code : null

    return <Form hideRequiredMark onSubmit={this.handleSubmit}>
      <Code {...{getFieldDecorator, onChange: this.onCodeChange, initialValue: code}} />
      <Description {...{getFieldDecorator, initialValue: description}} />
      <CancelSubmit loading={this.state.uploading} onCancel={onCancel} onDelete={onDelete} />
    </Form>
  }
}

const Description = ({ getFieldDecorator, initialValue }) => {
  const fieldDecorator = getFieldDecorator('description', { initialValue })
  return <Form.Item {...formItemLayout} label='Description'>
    {fieldDecorator(<Input.TextArea autosize={{ minRows: 3, maxRows: 8 }} placeholder='(Optional) You may want to provide a quick description for yourself and others of what this test utility does and where it may be helpful.' />)}
  </Form.Item>
}

const Code = ({ getFieldDecorator, onChange, initialValue }) => {
  const fieldDecorator = getFieldDecorator('code', {
    initialValue,
    rules: [ { required: true, message: 'Assert code is required' } ]
  })
  return <Form.Item
    {...formItemLayout}
    required
    hasFeedback
    label='Utility Function'
    help={<p>Given <strong>student</strong> and <strong>reference</strong>, the above expression should evaluate to <strong>#t</strong>.</p>}
  >
    {fieldDecorator(<Input.TextArea
      style={{ fontFamily: 'monospace' }}
      autosize={{ minRows: 3, maxRows: 10 }}
      onChange={onChange}
    />)}
  </Form.Item>
}

const CancelSubmit = ({ onCancel, onDelete, loading }) =>
  <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
    { onCancel && <Button style={{ marginRight: '1em' }} onClick={onCancel}>Cancel</Button> }
    { onDelete && <DeleteButton
      style={{ marginRight: '1em' }}
      confirmMessage='Are you sure you want to delete this utility?'
      onDelete={onDelete} /> }
    <Button type='primary' htmlType='submit' loading={loading}>Submit</Button>
  </Form.Item>

export default Form.create()(UtilityEditor)
