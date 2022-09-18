import { connect } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import { GetAllTodos, GetSelectedTodo, ClearSelectedTodo, AddTodo, UpdateTodo, DeleteTodo } from "../../Redux/Actions/TodoActions"
import "../../Assets/Css/Home.css"
import { current } from '@reduxjs/toolkit'
import Select from 'react-select'

export function Index(props) {

  const InitialData = {
    id: 0,
    content: '',
    isCompleted: false
  }
  const inputRef = useRef < HTMLInputElement > (null);
  const { Todos, GetAllTodos, GetSelectedTodo, ClearSelectedTodo, AddTodo, UpdateTodo, DeleteTodo } = props
  const [username, setUsername] = useState("")
  const [currentTodo, setcurrentTodo] = useState(InitialData)
  const [list, setList] = useState([])
  const [addOperation, setaddOperation] = useState(true)
  const [selectedStatus, setselectedStatus] = useState({ value: 'false', label: 'Tamamlanmadı' })
  useEffect(() => {
    const storageduser = localStorage.getItem('username')
    if (storageduser) {
      setUsername(storageduser)
      GetAllTodos()
    } else {
      props.history.push('/Login')
    }

  }, [])


  const HandleSubmit = () => {
    if (addOperation) {
      AddTodo(currentTodo)
    } else {
      let data = currentTodo
      data.isCompleted = selectedStatus.value
      UpdateTodo(data)
      setaddOperation(true)
    }
  }

  const HandleUpdateStatus = (e) => {
    const selectedtodo = Todos.list.find(item => item.id === e.target.id)
    setaddOperation(false)
    setcurrentTodo(current => ({ ...current, ...selectedtodo }))
  }

  const HandleonChange = (e) => {
    const item = currentTodo
    item.content = e.target.value
    setcurrentTodo(current => ({ ...current, ...item }))
  }

  const HandleDelete = (e) => {
    DeleteTodo(Todos.list.find(item => item.id === e.target.id))
  }

  const HandleClear = () => {
    setaddOperation(true)
    setcurrentTodo(InitialData)
  }

  const HandleLogout = () => {
    localStorage.removeItem("username")
    props.history.push('/Login')
  }

  const options = [
    { value: 'true', label: 'Completed' },
    { value: 'false', label: 'Not Completed' }
  ]

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand d-flex justify-content-center align-items-center" href="#" >
          <img src={require("../../Assets/Img/user.png")} width="30" height="30" alt="" />
          <h5 className='ml-2'>{username}</h5>
        </a>
        <div className='navbar-text'>
          <button onClick={HandleLogout} className="btn btn-secondary Home__Logout_Btn">Log out</button>
        </div>
      </nav>
      <div className='container align-items-center'>
        <div className='row mt-5'>
          <div className='col-3'>
            <div className='mt-10'>
              <form onSubmit={(e) => { e.preventDefault() }}>
                <div className="form-group">
                  <label >{addOperation ? "Adding New Job To Do" : "Job Update ID : " + currentTodo.id}</label>
                  <input type="text" className="form-control" placeholder="Job To Do"
                    value={currentTodo.content} onChange={HandleonChange}
                  />
                  {addOperation ? null :
                    <>
                      <label className='mt-2'> Status </label>
                      <Select options={options} value={selectedStatus} onChange={(e) => { setselectedStatus(e) }} />
                    </>
                  }
                </div>
                <button type="submit" className="btn btn-primary" onClick={HandleSubmit}>{addOperation ? "Add" : "Update"}</button>
                <button className="btn btn-primary ml-5" onClick={HandleClear}>Clean</button>
              </form>
            </div>
          </div>
          <div className='col-9'>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Job To Do</th>
                  <th scope="col">Is It Complete</th>
                  <th scope="col">Düzenle</th>
                  <th scope="col">Sil</th>
                </tr>
              </thead>
              <tbody>
                {Todos.list.map(item => {
                  return <tr key={item.id}>
                    <th>{item.id}</th>
                    <td>{item.content}</td>
                    {item.isCompleted ? <td>Tamamlandı</td> : <td>Tamamlanmadı</td>}
                    <td>
                      <button id={item.id} type="button" onClick={HandleUpdateStatus} className="btn btn-primary" >
                        Düzenle
                      </button>
                    </td>
                    <td>
                      <button id={item.id} type="button" onClick={HandleDelete} className="btn btn-primary" >
                        Sil
                      </button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}


const mapStateToProps = (state) => ({
  Todos: state.Todos
})

const mapDispatchToProps = { GetAllTodos, GetSelectedTodo, ClearSelectedTodo, AddTodo, UpdateTodo, DeleteTodo }

export default connect(mapStateToProps, mapDispatchToProps)(Index)