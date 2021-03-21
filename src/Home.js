import axios from 'axios';
import React, { useState, useEffect} from 'react'
import './App.css';

export default function Home() {
  const [nama, setNama] = useState("")
  const [data, setData] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState()
  const [detail, setDetail] = useState()

  const getData = () => {
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => setData(res.data))
  }

  const getDetail = (id) => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => setDetail(res.data))
  }

  const addData = (name) => {
    const data = {
      name: name
    }
    axios.post("https://jsonplaceholder.typicode.com/users", data)
    .then(res => console.log(res))
  }

  const editData = (nama, dataEdit) => {
    const data = {
      name: nama
    }
    axios.put(`https://jsonplaceholder.typicode.com/users/${dataEdit}`, data)
  }

  const getRemove = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div>
      <h3>Home</h3>
      <div className="detail">
        <form onSubmit={(e) => {
          e.preventDefault();
          //addData(nama)
          isEdit ? editData(nama, dataEdit) : addData(nama)
          }}>
          <input placeholder="name" value={nama} onChange={(e) => setNama(e.target.value)} />
        </form>
        {detail ? (
        <div>
          <h3>Nama : {detail.name}</h3>
          <h4>Username : {detail.username}</h4>
          <h4>no hp : {detail.phone}</h4>
          <h4>address : {detail.address.street} {detail.address.suite} {detail.address.city}</h4>
        </div>) : ""}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((n, key) => {
            return (<tr key={key}>
            <td>{n.name}</td>
            <td>
              <button onClick={() => getDetail(n.id)}>View</button>
              <button onClick={()=> {
                setNama(n.name)
                setIsEdit(true)
                setDataEdit(n.id)
                }}>Edit
              </button>
              <button onClick={() => getRemove(n.id)}>Delete</button>
            </td>
          </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}
