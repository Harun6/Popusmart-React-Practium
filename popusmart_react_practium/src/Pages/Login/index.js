import React, { useState } from 'react'
import User from "../../Assets/Img/user.png"
import "../../Assets/Css/Login.css"

export default function Index(props) {
  const [username, setUsername] = useState("")
  const [errmsg, setErrmsg] = useState(false)
  const handleLogin = () => {
    if (username && username !== "" && username.length > 3) {
      setErrmsg(false)
      localStorage.setItem("username", username)
      console.log('props: ', props);
      props.history.push("/home")
    } else {
      setErrmsg(true)
    }
  }

  const handleChange = (e) => {
    const {value} = e.target
    setUsername(value)
    if (errmsg) {
      if (value && value !== "" && value.length > 3) {
        setErrmsg(false)
      }
    }
  }

  return (
    <div className='container'>
      <div className='d-flex justify-content-center align-items-center flex-column Login__Container'>
        <div className="card text-white mb-3" >
          <div className="card-header d-flex justify-content-center align-items-center flex-column">
            <div className='Userlogo'>
              <img className='Login__Userlogo' src={User} />
            </div>
            <label className='Login__Title'>Todo App Application</label>
          </div>
          <div className="card-body">
            <h5 className="card-title">Please Login to the System with Your Username.</h5>
            <div className='d-flex justify-content-center align-items-center flex-column'>
              <label className='Login__Label__Err' hidden={!errmsg}>Please Enter a Valid Username</label>
              <label className='Login__Label__Err' hidden={!errmsg}>Username Must be at Least 4 Characters.</label>
              <input id="username" type="text" className={`form-control form-control-lg Login__Input ${errmsg ? "Login__Input__Err" : null}`} placeholder="Username"
                value={username} onChange={handleChange}
              ></input>
              <button className='btn btn-light Login__Button' onClick={() => { handleLogin() }}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
