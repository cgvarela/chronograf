export const ANNOTATION_MIN_DELTA = 0.5

export const ADDING = 'adding'
export const EDITING = 'editing'

export const TEMP_ANNOTATION = {
  id: 'tempAnnotation',
  text: 'Name Me',
  type: '',
  startTime: '',
  endTime: '',
}

export const visibleAnnotations = (graph, annotations = []) => {
  const [xStart, xEnd] = graph.xAxisRange()

  if (xStart === 0 && xEnd === 0) {
    return []
  }

  return annotations.filter(a => {
    if (a.endTime === a.startTime) {
      return xStart <= +a.startTime && +a.startTime <= xEnd
    }

    return !(+a.endTime < xStart || xEnd < +a.startTime)
  })
}
