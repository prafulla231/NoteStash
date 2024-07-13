import React,{useContext} from 'react'
import notecontext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(notecontext);
  const {deleteNote} = context;
  const { note ,updateNote} = props;
  return (
    
      <div className="col-md-3">
      <div className="card my-3" >
          <div className="card-body">
          <div className="d-flex align-items-center">
            <h4 className="card-title"> {note.title}</h4>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
            <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Note deleted successfully","success")}} ></i>
          </div>
         
            <p className="card-text">{note.description}</p>
            
          </div>
      </div>
    </div>
    
     
  )
}

export default NoteItem
