import React from 'react'
import { Icon, Upload } from 'antd'

class SubmissionCreator extends React.Component {
  state = { fileList: [] }

  render () {
    const { assignmentId } = this.props
    const action = `/api/assignments/${assignmentId}/submissions`
    return <Upload.Dragger
      accept='.rkt, .scm'
      action={action}
      fileList={this.state.fileList}
      beforeUpload={file => this.setState({ fileList: [file] })}
      onRemove={() => this.setState({ fileList: [] })}
      withCredentials
    >
      <p className='ant-upload-drag-icon'>
        <Icon type='inbox' />
      </p>
      <p className='ant-upload-hint'>Drop a .rkt file here</p>
    </Upload.Dragger>
  }
}

export default SubmissionCreator
