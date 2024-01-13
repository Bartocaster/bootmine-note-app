import React from 'react';
import { Note } from './types';
import NoteItem from './NoteItem';

interface NoteListProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onChangeContent: (content: string) => void;
  onChangeTitle: (title: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  onTextChange: (content: React.FormEvent) => void;
  onDeleteNote: (event: React.MouseEvent, noteId: number) => void;
  selectedNoteId: number;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onNoteClick, onChangeContent, onChangeTitle, onSubmit,onTextChange, onDeleteNote, selectedNoteId }) => {
  return (
    <div className="note-grid-container">
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onChangeTitle={onChangeTitle}
            onChangeContent={onChangeContent}
            onSubmit={(event) => onSubmit(event)}
            enabled={selectedNoteId === note.id ? true : false}
            onTextChange={() =>onTextChange}
            EditNoteClick={() => onNoteClick(note)}
            onDelete={(event) => onDeleteNote(event, note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
