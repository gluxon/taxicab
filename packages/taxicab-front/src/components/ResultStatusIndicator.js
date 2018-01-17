import { pure } from 'recompose'
import { Icon, Tooltip } from 'antd'

const ResultStatusIndicator = ({ passed }) =>
  passed
    ? <Tooltip title='Passed'>
      <Icon type='check-circle' style={{ color: '#38c83a' }} />
    </Tooltip>
    : <Tooltip title='Failed'>
      <Icon type='exclamation-circle' style={{ color: 'red' }} />
    </Tooltip>

export default pure(ResultStatusIndicator)
