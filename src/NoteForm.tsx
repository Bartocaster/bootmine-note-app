
import React from 'react';

interface NoteFormProps {
  title: string;
  content: string;
  onChangeTitle: (title: string) => void;
  onChangeContent: (content: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ title, content, onChangeTitle, onChangeContent, onSubmit, onCancel }) => {
  return (
    <form className="note-form" onSubmit={onSubmit}>
      <input
        value={title}
        onChange={(event) => onChangeTitle(event.target.value)}
        placeholder="Your note title"
        required
      />
      <textarea
        value={content}
        onChange={(event) => onChangeContent(event.target.value)}
        placeholder="Type your text here. Feel free to markdown"
        rows={10}
        required
      />
      <div className="edit-buttons">
        <button type="submit">Toevoegen</button>
        <button onClick={onCancel}>Annuleren</button>
      </div>
    </form>
  );
};

export default NoteForm;
