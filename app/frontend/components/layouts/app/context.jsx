import React, {useState, createContext} from 'react'
import PropTypes from 'prop-types'

/* Context 定義 */
const SigninContext = createContext(null)
const SigninProvider = SigninContext.Provider

const CancelContext = createContext(null)
const CancelProvider = CancelContext.Provider

const FlashContext = createContext(null)
const FlashProvider = FlashContext.Provider

const InvldContext = createContext(null)
const InvldProvider = InvldContext.Provider

/* Context 付与 */
const GenProvider = ({children}) => {
  const [isSignin, setIsSignin] = useState(!!localStorage.getItem('authToken'))
  const [cclMsg, setCclMsg] = useState(null)
  const [flashMsg, setFlashMsg] = useState(null)
  const [invldMsg, setInvldMsg] = useState([])

  return (
    <SigninProvider value={{isSignin, setIsSignin}}>
      <CancelProvider value={{cclMsg, setCclMsg}}>
        <FlashProvider value={{flashMsg, setFlashMsg}}>
          <InvldProvider value={{invldMsg, setInvldMsg}}>{children}</InvldProvider>
        </FlashProvider>
      </CancelProvider>
    </SigninProvider>
  )
}

GenProvider.propTypes = {
  children: PropTypes.node
}

export {GenProvider, SigninContext, CancelContext, FlashContext, InvldProvider}
