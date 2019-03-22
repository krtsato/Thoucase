import React, {useRef} from 'react'
import PropTypes from 'prop-types'

export const Namebox = (props) => {
  const {editorFocus} = props

  /* フォーカス */
  const nameRef = useRef(null)
  const nameBlur = () => {
    console.log('name / blur')
    nameRef.current.blur()
  }
  const onKeyDown = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      nameBlur()
      editorFocus()
    }
  }

  return(
    <input type='text' ref={nameRef} onKeyDown={onKeyDown} autoFocus />
  ) 
}

Namebox.propTypes = {
  editorFocus: PropTypes.func
}