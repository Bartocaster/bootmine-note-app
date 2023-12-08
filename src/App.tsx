import React, { useEffect, useState } from 'react';
import "./index.scss";
import "./App.scss";

type Note = {
  id: number;
  title: string;
  content: string;
}

// set up 4 pre notes to fill the screen.
const App = () => {
  const [notes, setNotes] = useState<Note[]>([])
  
  // the dummy array note are no longer required.
  // ([
  //   {
  //     id: 1,
  //     title: "note title 1",
  //     content: "content 1",
  //   },
  //   {
  //     id: 2,
  //     title: "note title 2",
  //     content: "content 2",
  //   },
  //   {
  //     id: 3,
  //     title: "note title 3",
  //     content: "content 3",
  //   },
  //   {
  //     id: 4,
  //     title: "note title 4",
  //     content: "content 4",
  //   },
  // ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null);

  useEffect(()=> {
    const fetchNotes = async ()=>{
      try {
        const respone = 
        await fetch("http://localhost:5000/api/notes")
        
        const notes: Note[] = await respone.json();

        setNotes(notes) // the object function.
      } catch (error) {
        console.log(error);
      }
    };

    // call the useEffect;
    fetchNotes();
    // empty bracket [] so the get dispalyed with the first render. 
  }, []);


  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }
  // adding async to the function
  const handleAddNote = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/notes",
        {
          method:"POST",
          headers: {
            "content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content,
          })
        }
      )
      const newNote= await response.json();

        setNotes([newNote, ...notes]);
        setTitle("");
        setContent("");
    } catch (error) {
      console.log(error);
    }
    // no longer needed for the front-end
    // const newNote: Note = {
    //   id: notes.length + 1,
    //   title: title,
    //   content: content,
    // };


  };
    
  const handleUpdateNote = async(
    event: React.FormEvent
  ) => {
    event.preventDefault();
    

    if(!selectedNote){
      return;
    }
    
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content,
          })
        }
      )
      
      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note)=>
      note.id === selectedNote.id
        ? updatedNote
        : note
      )
  
      setNotes(updatedNotesList);
      setTitle("")
      setContent("")
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
    // const updatedNote: Note = {
    //   id: selectedNote.id,
    //   title: title,
    //   content: content,
    // }
  };

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null);
  }
  
  const deleteNote = async (
    event: React.MouseEvent,
    noteId: number
    ) => {
      event.stopPropagation();
      
      try {
        await fetch(
          `http://localhost:5000/api/notes/${noteId}`,
          {
            method: "DELETE",
          }
        )
        const updatedNotes = notes.filter(
          (note) => note.id !== noteId
        )
    
        setNotes(updatedNotes);
      } catch (error) {
        
      }


  };

  
  return(
  <div className="app-container">
    <form className="note-form" 
    onSubmit={(event) => 
      selectedNote
      ? handleUpdateNote(event)
      : handleAddNote(event)
      }
    >
      <input 
      value={title}
      onChange={(event) =>
        setTitle(event.target.value)
      }
      placeholder="title" 
      required
      ></input>
      <textarea 
        value={content}
        onChange={(event) =>
          setContent(event.target.value)
        } 
      placeholder="Content"
      rows={10}
      required
      ></textarea>

      {selectedNote ? (
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <button type="submit">Add Note</button>
      )}
    </form>
      <div className="notes-grid">
        {notes.map((note)=> (
          <div className="note-item"
            onClick={()=> handleNoteClick(note)}
          >
            <div className="notes-header">
              <button onClick={(event) =>
                deleteNote(event, note.id)
              }
            >
              x
            </button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}

    </div>
  </div>
  );
};

export default App;
