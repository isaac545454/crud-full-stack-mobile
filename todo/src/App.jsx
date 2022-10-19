import { useState, useEffect } from 'react'
import Axios from 'axios'
import './App.css'

function App() {
  const [Task, setTask] = useState([])
  const [newTask, setNewTask] = useState('')
  const [idUpdate, setIdUpdate] = useState('')

  useEffect(()=>{
     fetchApi()
  }, [])
  const fetchApi = async()=>{
     await Axios('http://localhost:3000/tarefas')
     .then((res)=>setTask(res.data))
     .catch((err)=>console.log(err))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(newTask === ''){
      return
    }
    if(idUpdate){
   
      await Axios.patch('http://localhost:3000/tarefas', {
        id: idUpdate,
        tarefa: newTask
      })
      .then(()=>{
        setNewTask('')
        setIdUpdate('')
        fetchApi()
    })
      .catch((err)=>(alert(err)))
      return
    }
    
    await Axios.post('http://localhost:3000/tarefas', {
      tarefa: newTask
    })
    .then(()=>{
      setNewTask('')
      fetchApi()
    })
    .catch(()=>{})
  }

  const handleDelete = async(id)=>{
    console.log(`${id}`);
    await Axios.delete(`http://localhost:3000/tarefas/${id}`)
    .then(()=>fetchApi())
    .catch((err)=>console.log(err))
  }
  
  const handleUpdate = async(item)=>{
   setIdUpdate(item._id)
   setNewTask(item.tarefa)
  }

  return (
    <div className="App">
      <div className="header">
      <h1>react + node + mondoDB</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e)=>setNewTask(e.target.value)} value={newTask}/>
      <button type="submit">+</button>
      </form>
      </div>
      
      {Task && Task.map((item)=>(
        <div key={item._id} className="container">
          <h2>{item.tarefa}</h2>
          <div>
          <button onClick={()=>handleDelete(item._id)}>deletar</button>
          <button onClick={()=>handleUpdate(item)}>modificar</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
