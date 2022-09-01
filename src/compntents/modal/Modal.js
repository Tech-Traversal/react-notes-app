import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './modal.css'
import { Plus } from 'react-feather';

function ModalDiv({showModal,setShowModal,refresher}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [background, setBackground] = useState('#F9F5EB')
  const [foreground, setForeground] = useState('#fff')
  const [priority, setPriority] = useState('normal')

  const handleAdd = () =>{
    const savedData = JSON.parse(localStorage.getItem('myNotes')) || []
    if(!title || !content){
        return alert('Title and Content is required')
    }
    let newData ={
        id: Date.now(),
        title,
        content,
        priority,
        background,
        foreground,
        date: new Date().toLocaleDateString()
    }
    savedData.push(newData)
    localStorage.setItem('myNotes', JSON.stringify(savedData))
    setTitle('')
    setContent('')
    setPriority('normal')
    setShowModal(false)
    // window.location.reload()
    refresher()
  }

  const handleCancel = () =>{
    setTitle('')
    setContent('')
    setPriority('normal')
    setShowModal(false)
  }

  const handleColor = (bg, fg)=>{
    setBackground(bg)
    setForeground(fg)
  }


  return (
    <>
      <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input className='form-control mb-3' placeholder='Enter title' value={title} onChange={(e)=>setTitle(e.target.value)} />
            <label>Priority</label>
            <select className='form-control mb-3' value={priority} onChange={(e)=>setPriority(e.target.value)} >
                <option value='normal'>Normal</option>
                <option value='high'>High</option>
            </select>
            <textarea className='form-control' style={{height:'180px'}} placeholder='Enter notes....' value={content} onChange={(e)=>setContent(e.target.value)} ></textarea>
        {/* for theme selection */}
        <DropdownButton id="dropdown-basic-button" title="Select Theme">
      <Dropdown.Item href="#/action-1"><div className='d-flex' onClick={()=>handleColor('#54BAB9','#9ED2C6')}><div className='circle' style={{backgroundColor:'#54BAB9'}}></div> <div className='circle mx-3' style={{backgroundColor:'#9ED2C6'}}></div></div> </Dropdown.Item>
      <Dropdown.Item href="#/action-2"><div className='d-flex' onClick={()=>handleColor('#FFE898','#FFF8BC')}><div className='circle' style={{backgroundColor:'#FFE898'}}></div> <div className='circle mx-3' style={{backgroundColor:'#FFF8BC'}}></div></div></Dropdown.Item>
      <Dropdown.Item href="#/action-3"><div className='d-flex' onClick={()=>handleColor('#AfB4FF','#B1E1FF')}><div className='circle' style={{backgroundColor:'#AfB4FF'}}></div> <div className='circle mx-3' style={{backgroundColor:'#B1E1FF'}}></div></div></Dropdown.Item>
      <Dropdown.Item href="#/action-4"><div className='d-flex' onClick={()=>handleColor('#F9F5EB','#fff')}><div className='circle' style={{backgroundColor:'#F9F5EB'}}></div> <div className='circle mx-3 shadow' style={{backgroundColor:'#fff'}}></div> Default</div></Dropdown.Item>
    </DropdownButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            <Plus/> Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDiv