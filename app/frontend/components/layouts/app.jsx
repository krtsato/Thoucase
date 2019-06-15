import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {GenProvider} from 'components/layouts/app/context'
import {Header} from 'components/layouts/app/header'
import {Message} from 'components/layouts/app/message'
import {Routes} from 'components/layouts/app/routes'
import {Footer} from 'components/layouts/app/footer'

export const App = () => (
  <BrowserRouter>
    <GenProvider>
      <Message />
      <Header />
      <Routes />
      <Footer />
    </GenProvider>
  </BrowserRouter>
)

/* 共通状態管理
const General = ({children}) => {
  const [isSignin, setIsSignin] = useState(!!localStorage.getItem('authToken'))
  const [cclMsg, setCclMsg] = useState(null)
  const [flashMsg, setFlashMsg] = useState(null)
  const [invldMsg, setInvldMsg] = useState([])

  const onGenChange = (genTaskObj) => {
    Object.entries(genTaskObj).forEach((task) => {
      switch (task[0]) {
        case 'sninBool': // {sninBool: bool}
          setIsSignin(task[1])
          break
        case 'cclStr': // {cclStr: str}
          setCclMsg(task[1])
          break
        case 'flashStr': // {flashStr: str}
          setFlashMsg(task[1])
          break
        case 'invldArr': // {invldArr: [{str, str}, {} ...]}
          setInvldMsg(task[1])
          break
        default:
          break
      }
    })
  }

  // props 分類付加
  const childrenWithProps = React.Children.map(children, (child) => {
    switch (child.type) {
      case Header:
        return React.cloneElement(child, {isSignin, onGenChange})
      case Message:
        return React.cloneElement(child, {cclMsg, flashMsg, invldMsg})
      case Routes:
        return React.cloneElement(child, {isSignin, onGenChange})
      default:
        return child
    }
  })

  return childrenWithProps
}
*/
