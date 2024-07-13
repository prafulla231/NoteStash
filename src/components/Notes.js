import React, { useContext, useEffect, useRef,useState } from 'react'
import notecontext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(notecontext);
  let navigate = useNavigate();
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    getNotes()
    // eslint-disable-next-line
    else{
      navigate("/login")
    }
  }, []);


  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setnote] = useState({id :"",etitle:"",edescription:"",etag:""})


  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id: currentNote._id,etitle : currentNote.title, edescription: currentNote.description,etag : currentNote.tag})
  }
  const handleClick=(e)=>{
    console.log("updating the note..." ,note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
   refClose.current.click();
   props.showAlert("Note updated successfully","success")
    // addNote(note.title,note.description,note.tag);
}

const onChange =(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
    //jo bhi change kar raha hu uska name uske value ke barabar ho jaaye
}

  return (
    <>
      <AddNote showAlert = {props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button ref ={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}   />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" disabled ={note.etitle.length<5 || note.edescription.length<5||note.etag.length<2}className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

      <div className='row my-3'>
      
        <h1>Here are your notes:</h1>
        <div className="container">
         {notes.length === 0 && 'No notes available to display'} 
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        })}
      </div>
    </>
  )
}

export default Notes
