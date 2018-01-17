import React from 'react'
import styled from 'styled-components'
import { Collapse } from 'antd'
import UtilityEditor from 'components/UtilityEditor'
const { Panel } = Collapse

export default class UtilityList extends React.Component {
  componentWillMount () {
    this.props.fetchUtilities()
  }

  render () {
    const { utilities, createUtility, updateUtility, updateUtilityName, deleteUtility } = this.props
    return <Collapse>
      {utilities.map(utility =>
        <Panel
          header={<PanelHeader
            utility={utility}
            deleteUtility={deleteUtility}
          />}
          key={utility.id}
        >
          <UtilityEditor
            utility={utility}
            createUtility={createUtility}
            updateUtility={updateUtility}
            updateUtilityName={name => updateUtilityName(utility.id, name)}
            onDelete={() => deleteUtility(utility)}
          />
        </Panel>
      )}
    </Collapse>
  }
}

const PanelHeader = ({ utility, deleteUtility }) =>
  <PanelHeaderContainer>
    {utility.name}
  </PanelHeaderContainer>

const PanelHeaderContainer = styled.span`
  display: flex;
  justify-content: space-between;
`
