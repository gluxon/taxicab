import React from 'react'
import styled from 'styled-components'
import { Spin, Layout, Menu, Icon } from 'antd'
import { orderBy } from 'lodash'
import Result from 'components/Result'
import ResultStatusIndicator from 'components/ResultStatusIndicator'
const { Sider, Content } = Layout

export default class Results extends React.Component {
  static defaultProps = { results: [] }
  state = { selectedTest: null }

  // Keep a reference to the results currently in display in order to update
  // the display only after loading. See note in componentWillUpdate
  results = []

  componentWillMount = () => {
    this.props.fetchResults()
  }

  componentWillUpdate = (nextProps) => {
    if (nextProps.selectedSubmission !== this.props.selectedSubmission) {
      nextProps.fetchResults()
      return
    }

    // Only update the results in view if we're not trying to fetch them at the
    // moment. This prevents intermittent flashes of no data in the table when
    // we switch to displaying new results. Instead, we show the previous
    // results until the new ones are loaded in.
    if (!nextProps.isFetching || nextProps.results.length > 0) {
      this.results = nextProps.results
    }
  }

  render () {
    const { selectedTest } = this.state
    let { isFetching } = this.props

    // Keying the menu by the test id instead of the result id allows us to
    // preserve the user's selection across submissions when they click to
    // view a different one.
    const resultForCorrespondingTest = this.results
      .find(result => result.test.id === selectedTest)

    return <Container>
      <Spin spinning={isFetching}>
        <Layout style={{ backgroundColor: 'transparent' }}>
          <StyledSider>
            <TestsMenu
              results={this.results}
              onClick={({ key }) =>
                this.setState({ selectedTest: Number(key) })}
            />
          </StyledSider>
          <ResultDisplayContainer>
            { resultForCorrespondingTest
              ? <Result result={resultForCorrespondingTest} />
              : (
                <SelectATestPlaceholder>
                  <Icon type='rollback' />
                  <p>Select a test on the left to see its results.</p>
                </SelectATestPlaceholder>
              )}
          </ResultDisplayContainer>
        </Layout>
      </Spin>
    </Container>
  }
}

const TestsMenu = ({ results, onClick }) =>
  <Menu onClick={onClick} style={{ backgroundColor: 'transparent', border: 0 }} mode='inline'>
    {orderBy(results, ['test.name', 'test.id'])
      .map(result =>
        <Menu.Item key={result.test.id}>
          <ResultStatusIndicator passed={result.passed} />
          {result.test.name}
        </Menu.Item>)}
  </Menu>

const Container = styled.div`
  margin: 2em 0;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0, .15);

  .ant-spin-container {
    overflow: visible;
  }
`

const StyledSider = styled(Sider)`
  background-color: rgba(255,255,255, .8);
`

const ResultDisplayContainer = styled(Content)`
  background-color: rgba(0,0,0, .02);
`

const SelectATestPlaceholder = styled.div`
  padding: 2em;
  text-align: center;

  i {
    font-size: 2em;
  }

  p {
    margin: 2em 0;
  }
`
