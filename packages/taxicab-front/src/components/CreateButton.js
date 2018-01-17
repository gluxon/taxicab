import { pure } from 'recompose'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const CreateButton = ({ to }) =>
  <Link to={to}>
    <Button type='primary' icon='plus'>Create New</Button>
  </Link>

export default pure(CreateButton)
