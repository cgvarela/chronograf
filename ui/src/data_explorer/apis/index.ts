import AJAX from 'src/utils/ajax'
import _ from 'lodash'
import moment from 'moment'
import download from 'src/external/download'

import {proxy} from 'src/utils/queryUrlGenerator'
import {timeSeriesToTableGraph} from 'src/utils/timeSeriesTransformers'
import {dataToCSV} from 'src/shared/parsing/dataToCSV'
import {TEMPLATES} from 'src/shared/constants'
import {Source, QueryConfig} from 'src/types'

export const writeLineProtocol = async (
  source: Source,
  db: string,
  data: string
): Promise<void> =>
  await AJAX({
    url: `${source.links.write}?db=${db}`,
    method: 'POST',
    data,
  })

interface DeprecatedQuery {
  id: string
  host: string
  queryConfig: QueryConfig
  text: string
}

export const getDataForCSV = (
  query: DeprecatedQuery,
  errorThrown
) => async () => {
  try {
    const response = await fetchTimeSeriesForCSV({
      source: query.host,
      query: query.text,
      tempVars: TEMPLATES,
    })

    const {data} = timeSeriesToTableGraph([{response}])
    const name = csvName(query.queryConfig)
    download(dataToCSV(data), `${name}.csv`, 'text/plain')
  } catch (error) {
    errorThrown(error, 'Unable to download .csv file')
    console.error(error)
  }
}

const fetchTimeSeriesForCSV = async ({source, query, tempVars}) => {
  try {
    const {data} = await proxy({source, query, tempVars})
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const csvName = (query: QueryConfig): string => {
  const db = _.get(query, 'database', '')
  const rp = _.get(query, 'retentionPolicy', '')
  const measurement = _.get(query, 'measurement', '')

  const timestring = moment().format('YYYY-MM-DD-HH-mm')
  return `${db}.${rp}.${measurement}.${timestring}`
}
