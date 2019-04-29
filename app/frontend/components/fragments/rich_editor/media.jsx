import React from 'react'
import PropTypes from 'prop-types'

export const Media = (props) => {
  const {block, contentState} = props
  const entity = contentState.getEntity(block.getEntityAt(0))
  const urlType = entity.getType()
  const {urlVal} = entity.getData()
  let media = null

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
const Image = (props) => {
  return <img src={props.urlVal} />
}
const Audio = (props) => {
  return <audio controls src={props.urlVal} />
}
const Video = (props) => {
  return <video controls src={props.urlVal} />
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
