import React from 'react'

const Login = () => {

    const handleLogin = ()=>{
        localStorage.setItem("token","")
    }
  return (
    <div>Login page</div>
  )
}

export default Login