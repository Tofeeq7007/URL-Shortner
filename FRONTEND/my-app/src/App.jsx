import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Abcd } from './component/Urllow'
import { LoginForm } from './component/LoginFrom'
import { RegisterForm } from './component/RegisterForm'
import { AuthPage } from './pages/AuthPages'
import { Outlet } from '@tanstack/react-router'
import { Navbar } from './component/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

    {/* <RegisterForm/> */}
    <Navbar/>
    <Outlet/> 
    {/* <LoginForm/> */}
    {/* <AuthPage/> */}
    </div>
  )
}

export default App
