import reducer from 'src/kapacitor/reducers/rules'
import {defaultRuleConfigs} from 'src/kapacitor/constants'

import {
  chooseTrigger,
  addEvery,
  removeEvery,
  updateRuleValues,
  updateDetails,
  updateMessage,
  updateAlertNodes,
  updateRuleName,
  deleteRuleSuccess,
  updateRuleStatusSuccess,
} from 'src/kapacitor/actions/view'

describe('Kapacitor.Reducers.rules', () => {
  it('can choose a trigger', () => {
    const ruleID = 1
    const initialState = {
      [ruleID]: {
        id: ruleID,
        queryID: 988,
        trigger: '',
      },
    }

    let newState = reducer(initialState, chooseTrigger(ruleID, 'deadman'))
    expect(newState[ruleID].trigger).toBe('deadman')
    expect(newState[ruleID].values).toBe(defaultRuleConfigs.deadman)

    newState = reducer(initialState, chooseTrigger(ruleID, 'relative'))
    expect(newState[ruleID].trigger).toBe('relative')
    expect(newState[ruleID].values).toBe(defaultRuleConfigs.relative)

    newState = reducer(initialState, chooseTrigger(ruleID, 'threshold'))
    expect(newState[ruleID].trigger).toBe('threshold')
    expect(newState[ruleID].values).toBe(defaultRuleConfigs.threshold)
  })

  it('can update the every', () => {
    const ruleID = 1
    const initialState = {
      [ruleID]: {
        id: ruleID,
        queryID: 988,
        every: null,
      },
    }

    let newState = reducer(initialState, addEvery(ruleID, '30s'))
    expect(newState[ruleID].every).toBe('30s')

    newState = reducer(newState, removeEvery(ruleID))
    expect(newState[ruleID].every).toBe(null)
  })

  it('can update the values', () => {
    const ruleID = 1
    const initialState = {
      [ruleID]: {
        id: ruleID,
        queryID: 988,
        trigger: 'deadman',
        values: defaultRuleConfigs.deadman,
      },
    }

    const newDeadmanValues = {duration: '5m'}
    const newState = reducer(
      initialState,
      updateRuleValues(ruleID, 'deadman', newDeadmanValues)
    )
    expect(newState[ruleID].values).toBe(newDeadmanValues)

    const newRelativeValues = {func: 'max', change: 'change'}
    const finalState = reducer(
      newState,
      updateRuleValues(ruleID, 'relative', newRelativeValues)
    )
    expect(finalState[ruleID].trigger).toBe('relative')
    expect(finalState[ruleID].values).toBe(newRelativeValues)
  })

  it('can update the message', () => {
    const ruleID = 1
    const initialState = {
      [ruleID]: {
        id: ruleID,
        queryID: 988,
        message: '',
      },
    }

    const message = 'im a kapacitor rule message'
    const newState = reducer(initialState, updateMessage(ruleID, message))
    expect(newState[ruleID].message).toBe(message)
  })

  it('can update a slack alert', () => {
    const ruleID = 1
    const initialState = {
      [ruleID]: {
        id: ruleID,
        queryID: 988,
        alertNodes: {},
      },
    }
    const updatedSlack = {
      alias: 'slack-1',
      username: 'testname',
      iconEmoji: 'testemoji',
      enabled: true,
      text: 'slack',
      type: 'slack',
      url: true,
    }
    const expectedSlack = {
      username: 'testname',
      iconEmoji: 'testemoji',
    }
    const newState = reducer(
      initialState,
      updateAlertNodes(ruleID, [updatedSlack])
    )
    expect(newState[ruleID].alertNodes.slack[0]).toEqual(expectedSlack)
  })

  it('can update the name', () => {
    const ruleID = 1
    const name = 'New name'
    const initialState = {
      [ruleID]: {
        id: ruleID,
        queryID: 988,
        name: 'Random album title',
      },
    }

    const newState = reducer(initialState, updateRuleName(ruleID, name))
    expect(newState[ruleID].name).toBe(name)
  })

  it('it can delete a rule', () => {
    const rule1 = 1
    const rule2 = 2
    const initialState = {
      [rule1]: {
        id: rule1,
      },
      [rule2]: {
        id: rule2,
      },
    }

    expect(Object.keys(initialState).length).toBe(2)
    const newState = reducer(initialState, deleteRuleSuccess(rule2))
    expect(Object.keys(newState).length).toBe(1)
    expect(newState[rule1]).toBe(initialState[rule1])
  })

  it('can update details', () => {
    const ruleID = 1
    const details = 'im some rule details'

    const initialState = {
      [ruleID]: {
        id: ruleID,
        queryID: 988,
        details: '',
      },
    }

    const newState = reducer(initialState, updateDetails(ruleID, details))
    expect(newState[ruleID].details).toBe(details)
  })

  it('can update status', () => {
    const ruleID = 1
    const status = 'enabled'

    const initialState = {
      [ruleID]: {
        id: ruleID,
        queryID: 988,
        status: 'disabled',
      },
    }

    const newState = reducer(
      initialState,
      updateRuleStatusSuccess(ruleID, status)
    )
    expect(newState[ruleID].status).toBe(status)
  })
})
