import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'

import history from './history'

import Sidebar from 'components/Sidebar'
import LoginSentinel from 'containers/LoginSentinel'
import ConnectedHeader from 'containers/ConnectedHeader'
import Footer from 'components/Footer'

import Home from 'pages/Home'
import Login from 'pages/Login'
import Assignment from 'pages/Assignment'
import Assignments from 'pages/Assignments'
import AssignmentCreate from 'pages/AssignmentCreate'
import Testing from 'pages/Testing'
import Grades from 'pages/Grades'

import { Layout } from 'antd'
const { Content } = Layout

const App = () =>
  <ConnectedRouter history={history}>
    <LoginSentinel
      loginRender={() => <Login />}
      authenticatedRender={() => <Routes />}
    />
  </ConnectedRouter>

export default App

const Routes = () =>
  <MasterDetailLayout>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/assignments' component={Assignments} />
      <Route path='/assignments/create' component={AssignmentCreate} />
      <Route path='/assignments/:id' component={Assignment} />
      <Route path='/testing' component={Testing} />
      <Route path='/grades' component={Grades} />
    </Switch>
  </MasterDetailLayout>

const MasterDetailLayout = ({ children }) =>
  <Layout>
    <Sidebar />
    <Layout>
      <ConnectedHeader />
      <Content style={{ padding: '2em' }}>
        <div style={{ maxWidth: '1000px', 'margin': 'auto' }}>
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  </Layout>
