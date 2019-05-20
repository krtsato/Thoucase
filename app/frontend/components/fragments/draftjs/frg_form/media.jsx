import React from 'react'
import PropTypes from 'prop-types'

export const Media = ({block, contentState}) => {
  /* メディア 最終返却 */
  const entity = contentState.getEntity(block.getEntityAt(0))
  const urlType = entity.getType()
  const {urlVal} = entity.getData()

  switch (urlType) {
    case 'image':
      return <Image urlVal={urlVal} />
    case 'audio':
      return <Audio urlVal={urlVal} />
    case 'video':
      return <Video urlVal={urlVal} />
    default:
      return null
  }
}
const Image = ({urlVal}) => {
  return <img alt='img' src={urlVal} />
}
const Audio = ({urlVal}) => {
  return <audio controls src={urlVal} />
}
const Video = ({urlVal}) => {
  return <video controls src={urlVal} />
}

Media.propTypes = {
  block: PropTypes.object,
  contentState: PropTypes.object
}
Image.propTypes = {
  urlVal: PropTypes.string
}
Audio.propTypes = {
  urlVal: PropTypes.string
}
Video.propTypes = {
  urlVal: PropTypes.string
}
