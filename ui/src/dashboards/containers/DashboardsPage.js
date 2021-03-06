import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import DashboardsHeader from 'src/dashboards/components/DashboardsHeader'
import DashboardsContents from 'src/dashboards/components/DashboardsPageContents'

import {createDashboard} from 'src/dashboards/apis'
import {getDashboardsAsync, deleteDashboardAsync} from 'src/dashboards/actions'

import {NEW_DASHBOARD} from 'src/dashboards/constants'
import {ErrorHandling} from 'src/shared/decorators/errors'

@ErrorHandling
class DashboardsPage extends Component {
  componentDidMount() {
    this.props.handleGetDashboards()
  }

  handleCreateDashboard = async () => {
    const {
      source: {id},
      router: {push},
    } = this.props
    const {data} = await createDashboard(NEW_DASHBOARD)
    push(`/sources/${id}/dashboards/${data.id}`)
  }

  handleCloneDashboard = dashboard => async () => {
    const {
      source: {id},
      router: {push},
    } = this.props
    const {data} = await createDashboard({
      ...dashboard,
      name: `${dashboard.name} (clone)`,
    })
    push(`/sources/${id}/dashboards/${data.id}`)
  }

  handleDeleteDashboard = dashboard => () => {
    this.props.handleDeleteDashboard(dashboard)
  }

  render() {
    const {dashboards} = this.props
    const dashboardLink = `/sources/${this.props.source.id}`

    return (
      <div className="page">
        <DashboardsHeader sourceName={this.props.source.name} />
        <DashboardsContents
          dashboardLink={dashboardLink}
          dashboards={dashboards}
          onDeleteDashboard={this.handleDeleteDashboard}
          onCreateDashboard={this.handleCreateDashboard}
          onCloneDashboard={this.handleCloneDashboard}
        />
      </div>
    )
  }
}

const {arrayOf, func, string, shape} = PropTypes

DashboardsPage.propTypes = {
  source: shape({
    id: string.isRequired,
    name: string.isRequired,
    type: string,
    links: shape({
      proxy: string.isRequired,
    }).isRequired,
    telegraf: string.isRequired,
  }),
  router: shape({
    push: func.isRequired,
  }).isRequired,
  handleGetDashboards: func.isRequired,
  handleDeleteDashboard: func.isRequired,
  dashboards: arrayOf(shape()),
}

const mapStateToProps = ({dashboardUI: {dashboards, dashboard}}) => ({
  dashboards,
  dashboard,
})

const mapDispatchToProps = dispatch => ({
  handleGetDashboards: bindActionCreators(getDashboardsAsync, dispatch),
  handleDeleteDashboard: bindActionCreators(deleteDashboardAsync, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(DashboardsPage)
)
