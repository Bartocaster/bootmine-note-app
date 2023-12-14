import React, { useEffect, useState } from 'react';
import "./index.scss";
import "./App.scss";
import trashcan from "./icons/basic_trashcan.png";
import pencil from "./icons/software_pencil.png";


type Note = {
  id: number;
  title: string;
  content: string;
}

// set up 4 pre notes to fill the screen.
const App = () => {
  const [notes, setNotes] = useState<Note[]>([])

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
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

  // when a note get clicked we want the input to be filled with what was written on the note.
  const handleNoteClick = (note: Note) => {
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
          method: "POST",
          headers: {
            "content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content,
          })
        }
      )
      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!selectedNote) {
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

      const updatedNotesList = notes.map((note) =>
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

    const confirmDelete = window.confirm("Are you sure you want to delete this note?");

    if (confirmDelete) {
      try {
        await fetch(
          `http://localhost:5000/api/notes/${noteId}`,
          {
            method: "DELETE",
          }
        );

        const updatedNotes = notes.filter(
          (note) => note.id !== noteId
        );

        setNotes(updatedNotes);

        // Show a confirmation message after successful deletion
      } catch (error) {
        console.log(error);
      }
    }
  };



  return (
    <div>
      <div className="header-container">
        <header className="header">
          Bootmine
        </header>
      </div>
      <div className="note-grid-container ">
        <div className="notes-grid">
          {notes.map((note) => (
            <div className="note-item"
              onClick={() => handleNoteClick(note)}
            >
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <div className="notes-header">
                <button onClick={(event) =>
                  deleteNote(event, note.id)
                }
                >
                  <img src={trashcan} alt="trashcan"></img>
                </button>
                <img src={pencil} alt="pencil"></img>
              </div>
            </div>
          ))}

        </div>
      </div>
      <footer className='note-form-container '>
      <div className='new-note'>
        New note
      </div>
      
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
            placeholder="Your note title"
            required
          ></input>
          <textarea
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            placeholder="Type your text here. Feel free to markdown"
            rows={10}
            required
          ></textarea>

          {selectedNote ? (
            <div className="edit-buttons">
              <button type="submit">Toevoegen</button>
              <button onClick={handleCancel}>Annuleren</button>
            </div>
          ) : (
            <button type="submit">Toevoegen</button>
          )}
        </form>
        </footer>
        <div className='bottem'>
          <div>
            © Bootmine,  2023 
          </div>
          <div>
            1 Note
          </div>
        </div>
      
    </div>
  );
};

export default App;
