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
            <label className='Login__Title'>Todo App Uygulaması</label>
          </div>
          <div className="card-body">
            <h5 className="card-title">Lütfen Kullanıc Adınız ile sisteme giriş yapınız.</h5>
            <div className='d-flex justify-content-center align-items-center flex-column'>
              <label className='Login__Label__Err' hidden={!errmsg}>Lütfen Geçerli Bir kullanıcı adı giriniz</label>
              <label className='Login__Label__Err' hidden={!errmsg}>Kullanıcı Adı en az 4 karakter olmalı</label>
              <input id="username" type="text" className={`form-control form-control-lg Login__Input ${errmsg ? "Login__Input__Err" : null}`} placeholder="Kullanıc Adı"
                value={username} onChange={handleChange}
              ></input>
              <button className='btn btn-light Login__Button' onClick={() => { handleLogin() }}>Giriş Yap</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
