import { pure } from 'recompose'
import { Popconfirm, Button } from 'antd'

const DeleteAssignment = ({ placement, confirmMessage, onDelete, ...buttonProps }) =>
  <Popconfirm
    title={confirmMessage}
    placement={placement}
    onConfirm={onDelete}
  >
    <Button
      type='danger'
      icon='close-circle-o'
      {...buttonProps}
    >
      Delete
    </Button>
  </Popconfirm>

export default pure(DeleteAssignment)
