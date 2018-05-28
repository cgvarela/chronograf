import React, {PureComponent} from 'react'
import {getDataForCSV} from 'src/data_explorer/apis'
import VisHeaderTabs from 'src/data_explorer/components/VisHeaderTabs'
import {OnToggleView} from 'src/data_explorer/components/VisHeaderTab'

interface Props {
  views: string[]
  view: string
  query: any
  onToggleView: OnToggleView
  errorThrown: () => void
}

class VisHeader extends PureComponent<Props> {
  public render() {
    const {views, view, onToggleView, query, errorThrown} = this.props

    return (
      <div className="graph-heading">
        {!!views.length && (
          <VisHeaderTabs
            view={view}
            views={views}
            currentView={view}
            onToggleView={onToggleView}
          />
        )}
        {query && (
          <div
            className="btn btn-sm btn-default dlcsv"
            onClick={getDataForCSV(query, errorThrown)}
          >
            <span className="icon download dlcsv" />
            .csv
          </div>
        )}
      </div>
    )
  }
}

export default VisHeader
