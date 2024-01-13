
import { Note } from './types';
import trashcan from "./icons/basic_trashcan.png";
import pencil from "./icons/software_pencil.png";
import React from 'react';

interface NoteItemProps {
  note: Note;
  EditNoteClick: () => void;
  onChangeContent: (content: string) => void;
  onChangeTitle: (title: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  onTextChange: (content: React.FormEvent) => void;
  onDelete: (event: React.MouseEvent) => void;
  enabled: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, EditNoteClick, onChangeContent, onChangeTitle,onSubmit, onTextChange, onDelete, enabled }) => {
  return (
    <div className="note-item">
      <div className='note-header'>
        <h2>{note.title}</h2>
      </div>
      <div className='note-divider-wrapper'>
        <hr className='note-divider'></hr>
      </div>
      <form className="note-edit-form" onSubmit={onSubmit}> 
        <div className='note-body' onClick={EditNoteClick}>
          <textarea className='note-textarea'
            name="content"
            defaultValue={note.content}
            onChange={(event) => onChangeContent(event.target.value)}
            readOnly={!enabled}
            disabled={!enabled}
          ></textarea>
        </div>
        <div className="notes-footer">
          <button onClick={onDelete}>
            <img src={trashcan} alt="trashcan" />
          </button>
          <button type='submit'>
            <img src={pencil} alt="pencil" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteItem;