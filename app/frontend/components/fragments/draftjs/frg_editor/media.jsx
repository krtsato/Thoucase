import React from 'react'
import PropTypes from 'prop-types'

export const Media = (props) => {
  let media = null
  const {block, contentState} = props
  const entity = contentState.getEntity(block.getEntityAt(0))
  const urlType = entity.getType()
  const {urlVal} = entity.getData()

  switch (urlType) {
    case 'image':
      media = <Image urlVal={urlVal} />
      break
    case 'audio':
      media = <Audio urlVal={urlVal} />
      break
    case 'video':
      media = <Video urlVal={urlVal} />
      break
    default:
      break
  }
  return media
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
Image.propTypes = {
  urlVal: PropTypes.string
}
Audio.propTypes = {
  urlVal: PropTypes.string
}
Video.propTypes = {
  urlVal: PropTypes.string
}
