import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { sidebar } from 'config'

const { Sider } = Layout

const Sidebar = withRouter(({ location }) => {
  const matches = /(\/[^/]*)\/?/.exec(location.pathname)
  const firstLevel = matches ? matches[1] : null

  return <Sider
    style={{ minHeight: '100vh' }}
    collapsible
    breakpoint='md'
  >
    <Link to='/'><LogoContainer>Taxicab</LogoContainer></Link>
    <Menu theme='dark' selectedKeys={[firstLevel]}>
      { sidebar.map(({ title, href, icon }) =>
        <Menu.Item key={href}>
          <MenuItemLink to={href}>
            <Icon type={icon} />
            <span className='nav-text'>{title}</span>
          </MenuItemLink>
        </Menu.Item>
      )}
    </Menu>
  </Sider>
})

export default Sidebar

const LogoContainer = styled.div`
  height: 64px;
  color: white;
  padding: 1rem;
  font-size: 1.5em;
  background-color: rgba(255,255,255, .15);
  text-decoration: none;
`

const MenuItemLink = styled(Link)`
  color: inherit;
`
