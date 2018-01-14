import React from 'react'
import styled from 'styled-components'
import { Spin, Icon } from 'antd'

export default class StandardFetchIndicator extends React.Component {
  render () {
    const { isFetching, hadErrorFetching, resourceName, children } = this.props
    if (isFetching) {
      return <FetchingContainer>
        <Spin size='large' />
      </FetchingContainer>
    } else if (hadErrorFetching) {
      return <ErrorContainer>
        <Icon type='frown-o' style={{ fontSize: '2em' }} />
        <p>There was an error loading {resourceName}. Please try again later.</p>
      </ErrorContainer>
    }
    return children || null
  }
}

const FetchingContainer = styled.div`
  text-align: center;
  margin: 2em auto;
`

const ErrorContainer = styled.div`
  margin: 2em auto;
  max-width: 20em;
  text-align: center;

  p {
    margin: 1em;
  }
`
