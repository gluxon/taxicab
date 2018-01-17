import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { Card } from 'antd'
import ConnectedUtilityCreator from 'containers/ConnectedUtilityCreator'
import ConnectedUtilityList from 'containers/ConnectedUtilityList'
import SchemeSource from 'components/SchemeSource'
import CreateButton from 'components/CreateButton'

export default class Assignments extends React.Component {
  render () {
    const { history } = this.props
    document.title = 'Test Utilities | Taxicab'
    return <Card title='Test Utilities' extra={<CreateButton to='/testing/create' />}>
      <TestingExplanation />
      <Route path='/testing/create' component={() =>
        <UtilityCreatorContainer>
          <ConnectedUtilityCreator onCancel={() => history.replace('/testing')} history={history} />
        </UtilityCreatorContainer>
      } />
      <ConnectedUtilityList />
    </Card>
  }
}

const TestingExplanation = () =>
  <Fragment>
    <p>
      Many of the assertions in test cases require special equality functions.
      For example, you may want to create the following function to ensure
      small floating point precision differences are ignored.
    </p>
    <SchemeSource>{example}</SchemeSource>
    <p>
      These functions are available in the test assertion environment.
    </p>
  </Fragment>

const example = /* @scheme */`\
(define (REF-float-equal a b tol)
  (<= (abs (- a b) tol))
`

const UtilityCreatorContainer = styled.div`
  background-color: #fafafa;
  margin: 2em 0; padding: 2em 1em 0;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`
