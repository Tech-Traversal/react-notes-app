import React,{useState} from 'react'
import './single.css'
import {Rating} from 'react-simple-star-rating'
import { Check, PenTool, Trash } from 'react-feather'

const SingleNote = ({item,refresher}) => {
    let savedData = JSON.parse(localStorage.getItem('myNotes')) || []
    const [rating, setRating] = useState(item.priority === 'high' ? 100 : 0)
    const [edit, setEdit] = useState(false)
    const [content, setContent] = useState(item.content)

    const handleDelete = () =>{
    const pass = window.confirm('Are you sure you want to delete this note ?')
    if(!pass){
        return
    }
    if(savedData.length){
        let newData = savedData.filter((data)=>data.id !== item.id)
        localStorage.setItem('myNotes', JSON.stringify(newData))

        // window.location.reload()
        refresher()
    }
    }

    const handleEdit = () =>{
        let idx = savedData.findIndex((x)=>x.id === item.id)
        savedData[idx].content = content;
        localStorage.setItem('myNotes', JSON.stringify(savedData))
        setEdit(false)
        // window.location.reload()
        refresher()
    }

  return (
    <div className='px-2 col-lg-3 col-md-4 col-sm-6 h-100 mb-5'>
        <div className='card shadow px-2' style={{backgroundColor:`${item.background}`}}>
            <div className='title-div w-100 text-center'>
                <div className='priority text-center text-light shadow'>
                    <p className='text-light fw-light mb-0'>Priority</p>
                    <Rating ratingValue={rating} iconsCount={1} transition={true} className='star'/>
                    {rating === 100 ?
                    <p className='fw-bold text-warning'>High</p>
                    :
                    <p className='text-light'>Normal</p>    
                }
                </div>
                <h1 className='fw-light'>{item.title}</h1>
            </div>
            <div className='content'>
                <textarea className='form-control' disabled={!edit} value={content} onChange={(e)=>setContent(e.target.value)} style={{backgroundColor: `${item.foregroud}`}}>

                </textarea>

            </div>
            <section className='d-flex justify-content-between my-2'>
                {!edit ?
                <button className='btn btn-outline-warning btn-sm shadow' onClick={()=>setEdit(true)}><PenTool/></button>
            :
            <button className='btn btn-outline-primary btn-sm shadow' onClick={handleEdit}><Check/></button>
            }

            <button className='btn btn-outline-danger btn-sm shadow' onClick={handleDelete}><Trash/></button>
            </section>
        </div>

    </div>
  )
}

export default SingleNote