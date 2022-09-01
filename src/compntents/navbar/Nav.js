import React,{useState} from 'react'
import {Plus, RefreshCcw, Search, Trash2} from 'react-feather'

const Nav = ({setShowModal, data, setData, refresher}) => {
const [searchValue, setSearchValue] = useState('')

const deleteAll = () =>{
    const pass = window.confirm('Are you sure you want to delete all notes ?')
    if(!pass){
        return
    }
    localStorage.removeItem('myNotes')
    // window.location.reload()
    refresher()
}

const sorter = (value) =>{
    if(value === 'latest'){
        data.sort((a,b)=>b.id - a.id)
    }
    if(value === 'oldest'){
        data.sort((a,b)=>a.id - b.id)
    }
    if(value === 'high'){
        data.sort((a,b)=>a.priority.localeCompare(b.priority))
    } 
    if(value === 'normal'){
        data.sort((a,b)=>b.priority.localeCompare(a.priority))
    } 
    setData([...data])
}

const search = (e) =>{
    e.preventDefault()
    let newData;
    if(searchValue){
        newData = data.filter((x)=>x.title.toLowerCase().includes(searchValue.toLowerCase()))
        setData([...newData])
    }else{
        // window.location.reload()
        refresher()
    }
}

  return (
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">My Notes</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item dropdown my-3">
          <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort By:
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" onClick={()=>sorter('latest')}>Latest first</a></li>
            <li><a className="dropdown-item" onClick={()=>sorter('oldest')}>Oldest first</a></li>
            <li><a className="dropdown-item" onClick={()=>sorter('high')}>Priority high</a></li>
            <li><a className="dropdown-item" onClick={()=>sorter('normal')}>Priority normal</a></li>
          </ul>
        </li>

        <li className='nav-item mx-2'>
            <button className='nav-link btn btn-sm btn-info text-light px-2 my-3' onClick={()=>setShowModal(true)}><Plus/> Add new</button>
        </li>
        <li className='nav-item mx-2'>
            <button className='nav-link btn btn-sm btn-danger text-light px-2 my-3' onClick={deleteAll}><Trash2/> Delete All</button>
        </li>

      </ul>
      <form className="d-flex" onSubmit={search}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchValue(e.target.value)} />
        <button className="btn btn-outline-success" type="submit">{searchValue ? <Search/> : <RefreshCcw/>}</button>
      </form>
    </div>
  </div>
</nav>

  )
}

export default Nav