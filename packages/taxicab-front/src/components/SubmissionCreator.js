import React from 'react'
import { Icon, Upload } from 'antd'

class SubmissionCreator extends React.Component {
  state = { fileList: [] }

  customRequest = (opts) => {
    const { createSubmission, fetchSubmission, selectSubmission } = this.props
    createSubmission({ file: opts.file })
      .then(res => {
        opts.onSuccess()
        const id = Number(res.headers.get('location').replace('/api/submissions/', ''))
        return fetchSubmission(id)
      })
      .catch(err => { opts.onError(err) })
      .then(submission => selectSubmission(submission.id))
  }

  render () {
    return <Upload.Dragger
      accept='.rkt, .scm'
      fileList={this.state.fileList}
      beforeUpload={file => this.setState({ fileList: [file] })}
      onRemove={() => this.setState({ fileList: [] })}
      customRequest={this.customRequest}
    >
      <p className='ant-upload-drag-icon'>
        <Icon type='inbox' />
      </p>
      <p className='ant-upload-hint'>Drop a .rkt file here</p>
    </Upload.Dragger>
  }
}

export default SubmissionCreator
