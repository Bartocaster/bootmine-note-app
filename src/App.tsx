import React, { useState } from 'react';
import logo from './logo.svg';
import "./index.scss";
import "./App.scss";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "note title 1",
      content: "content 1",
    },
    {
      id: 2,
      title: "note title 2",
      content: "content 2",
    },
    {
      id: 3,
      title: "note title 3",
      content: "content 3",
    },
    {
      id: 4,
      title: "note title 4",
      content: "content 4",
    },
  ]);
  return(
  <div className="app-container">
    <form className="note-form">
      <input 
      placeholder="title" 
      required
      ></input>
      <textarea placeholder="Content"
      rows={10}
      required
      ></textarea>
      <button  type="submit" >
        Add Note
      </button>
    </form>
      <div className="notes-grid">
        {notes.map((note)=> (
          <div className="note-item">
            <div className="notes-header">
              <button>x</button>
            </div>
            <h2>Note Title</h2>
            <p>Note Content</p>
          </div>
        ))}

    </div>
  </div>
  );
};

export default App;
