import React,{useContext} from 'react'
import notecontext from '../context/notes/noteContext';
import {useState} from 'react'

const AddNote = (props) => {
    const context = useContext(notecontext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"",description:"",tag:""});

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""})
        props.showAlert("Note Added successfully","success")
    }

    const onChange =(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
        //jo bhi change kar raha hu uska name uske value ke barabar ho jaaye
    }
    return (
        <div>
            <div className="container my-5">
                <h1>Add your notes</h1>
                <form className="my-5">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">  Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange}  />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Add Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}  />
                    </div>
                    <div className="mb-3 my-3">
                        <label htmlFor="description" className="form-label" > Add tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}   />
                    </div>
                    <button disabled ={note.title.length<5 || note.description.length<5||note.tag.length<2} type="submit" className="btn btn-primary my-3" onClick={handleClick} >Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
