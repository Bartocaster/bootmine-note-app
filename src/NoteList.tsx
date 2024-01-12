import React from 'react';
import { Note } from './types';
import NoteItem from './NoteItem';

interface NoteListProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onDeleteNote: (event: React.MouseEvent, noteId: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onNoteClick, onDeleteNote }) => {
  return (
    <div className="note-grid-container">
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onClick={() => onNoteClick(note)}
            onDelete={(event) => onDeleteNote(event, note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
