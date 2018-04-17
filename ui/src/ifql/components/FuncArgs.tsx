import React, {PureComponent} from 'react'
import FuncArg from 'src/ifql/components/FuncArg'
import {OnChangeArg} from 'src/ifql/components/FuncArgInput'
import {ErrorHandling} from 'src/shared/decorators/errors'

interface Arg {
  key: string
  value: string
  type: string
}

export interface Func {
  name: string
  args: Arg[]
  source: string
  id: string
}

interface Props {
  func: Func
  onChangeArg: OnChangeArg
  onGenerateScript: () => void
}

@ErrorHandling
export default class FuncArgs extends PureComponent<Props> {
  public render() {
    const {func, onChangeArg, onGenerateScript} = this.props

    return (
      <div className="func-args">
        {func.args.map(({key, value, type}) => {
          return (
            <FuncArg
              funcID={func.id}
              key={key}
              type={type}
              argKey={key}
              value={value}
              onChangeArg={onChangeArg}
              onGenerateScript={onGenerateScript}
            />
          )
        })}
      </div>
    )
  }
}
