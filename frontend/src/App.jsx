import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<UserProtectWrapper><Home /></UserProtectWrapper>} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/users/logout" element={<UserProtectWrapper><UserLogout /></UserProtectWrapper>} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path='/captains/logout' element={<CaptainProtectWrapper><CaptainLogout /></CaptainProtectWrapper>} />
        <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        
      </Routes>
    </div>
  )
}

export default App
