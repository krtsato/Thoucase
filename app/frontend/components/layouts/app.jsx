import React, {useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Header} from 'components/layouts/app/header'
import {Message} from 'components/layouts/app/message'
import {Routes} from 'components/layouts/app/routes'
import {Footer} from 'components/layouts/app/footer'

export const App = () => {
  return (
    <BrowserRouter>
      <General>
        <Message />
        <Header />
        <Routes />
        <Footer />
      </General>
    </BrowserRouter>
  )
}

/* 共通状態管理 */
const General = ({children}) => {
  const [isSignin, setIsSignin] = useState(!!localStorage.getItem('authToken'))
  const [cclMsg, setCclMsg] = useState(null)
  const [flashMsg, setFlashMsg] = useState(null)
  const [invldMsg, setInvldMsg] = useState([])

  const onGenChange = (genTaskObj) => {
    // To Do 1度の呼出しで更新する Object.entries()
    const key = Object.keys(genTaskObj)[0]
    const val = Object.values(genTaskObj)[0]
    switch (key) {
      case 'sninBool': // {sninBool: bool}
        setIsSignin(val)
        break
      case 'cclStr': // {cclStr: str}
        setCclMsg(val)
        break
      case 'flashStr': // {flashStr: str}
        setFlashMsg(val)
        break
      case 'invldArr': // {invldArr: arr of string}
        setInvldMsg(val)
        break
      default:
        break
    }
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
