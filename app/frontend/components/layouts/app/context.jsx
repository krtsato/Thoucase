import React, {useState, createContext} from 'react'
import PropTypes from 'prop-types'

/* Context 定義 */
const RedrContext = createContext(null)
const RedrProvider = RedrContext.Provider

const SigninContext = createContext(null)
const SigninProvider = SigninContext.Provider

const FlashContext = createContext(null)
const FlashProvider = FlashContext.Provider

const CancelContext = createContext(null)
const CancelProvider = CancelContext.Provider

const InvldContext = createContext(null)
const InvldProvider = InvldContext.Provider

/* Context 付与 */
const GenProvider = ({children}) => {
  const [redrPath, setRedrPath] = useState(null)
  const [isSignin, setIsSignin] = useState(!!localStorage.getItem('authToken'))
  const [cclMsg, setCclMsg] = useState(null)
  const [flashMsg, setFlashMsg] = useState(null)
  const [invldMsg, setInvldMsg] = useState(null)

  return (
    <RedrProvider value={{redrPath, setRedrPath}}>
      <SigninProvider value={{isSignin, setIsSignin}}>
        <FlashProvider value={{flashMsg, setFlashMsg}}>
          <CancelProvider value={{cclMsg, setCclMsg}}>
            <InvldProvider value={{invldMsg, setInvldMsg}}>{children}</InvldProvider>
          </CancelProvider>
        </FlashProvider>
      </SigninProvider>
    </RedrProvider>
  )
}

GenProvider.propTypes = {
  children: PropTypes.node
}

export {GenProvider, RedrContext, SigninContext, CancelContext, FlashContext, InvldContext}
