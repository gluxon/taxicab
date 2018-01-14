import { Button, Dropdown, Icon, Layout, Menu } from 'antd'
const { Header } = Layout

export default ({ user }) =>
  <Header style={{ backgroundColor: '#fff', padding: '0 2em', textAlign: 'right' }}>
    <Dropdown overlay={<UserMenu />}>
      <Button>{user.netid} <Icon type='down' /></Button>
    </Dropdown>
  </Header>

const UserMenu = () =>
  <Menu>
    <Menu.Item key='Logout'>
      <a href='/api/user/logout'>Logout</a>
    </Menu.Item>
  </Menu>
