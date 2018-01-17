import React from 'react'
import { Collapse } from 'antd'
import UtilityEditor from 'components/UtilityEditor'
const { Panel } = Collapse

export default class UtilityList extends React.Component {
  componentWillMount () {
    this.props.fetchUtilities()
  }

  render () {
    const { utilities, createUtility, updateUtility, updateUtilityName } = this.props
    return <Collapse>
      {utilities.map(utility =>
        <Panel header={utility.name} key={utility.id}>
          <UtilityEditor
            utility={utility}
            createUtility={createUtility}
            updateUtility={updateUtility}
            updateUtilityName={name => updateUtilityName(utility.id, name)}
          />
        </Panel>
      )}
    </Collapse>
  }
}
