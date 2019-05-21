import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setFlashStr, setCclStr} from 'components/layouts/axios/then_catch_funcs'

export const CrsSelect = ({onGenChange, bufCrsIdChange}) => {
  const crsSelect = null // return

  /* didMount */
  useEffect(() => {
    axiosRails
      .get('/fragments/new')
      .then((response) => {
        console.log(`CrsSelect / didMount : ${JSON.stringify(response, undefined, 2)}`)
        // crsSelect = hoge
      })
      .catch((error) => {
        onGenChange(setCclStr(error))
        onGenChange(setFlashStr(error.response.header.flash))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  /* crsId 更新  */
  const onCrsIdChange = (e) => {
    e.preventDefault()
    bufCrsIdChange(e.target.value)
  }

  return crsSelect
}

CrsSelect.propTypes = {
  onGenChange: PropTypes.func,
  bufCrsIdChange: PropTypes.func
}
