import React, { useEffect, useState } from 'react';
import "./index.scss";
import "./App.scss";
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import DeleteConfirmation from './DeleteConfirmation';

type Note = {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState<number | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const fetchedNotes: Note[] = await response.json();
        setNotes(fetchedNotes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content,
        })
      });

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

  const deleteNote = (
    event: React.MouseEvent,
    noteId: number
  ) => {
    event.stopPropagation();
    setNoteToDeleteId(noteId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/notes/${noteToDeleteId}`, {
        method: "DELETE",
      });

      const updatedNotes = notes.filter(
        (note) => note.id !== noteToDeleteId
      );

      setNotes(updatedNotes);
      setShowDeleteConfirmation(false);
      setNoteToDeleteId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setNoteToDeleteId(null);
  };

  

  return (
    <div>
      <div className="header-container">
        <header className="header">
          Bootmine
        </header>
      </div>
      <NoteList
        notes={notes}
        onNoteClick={handleNoteClick}
        onDeleteNote={deleteNote}
      />
      <footer className="note-form-container">
        <div className="new-note">New note</div>
        <NoteForm
          title={title}
          content={content}
          onChangeTitle={setTitle}
          onChangeContent={setContent}
          onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}
          onCancel={handleCancel}
        />
      </footer>
      <div className="bottom">
        <div>© Bootmine, 2023</div>
        <div>{notes.length} Note{notes.length !== 1 ? 's' : ''}</div>
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmation
          onCancelDelete={handleCancelDelete}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default App;
