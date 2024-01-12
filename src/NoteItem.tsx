
import { Note } from './types'; 
import trashcan from "./icons/basic_trashcan.png";
import pencil from "./icons/software_pencil.png";

interface NoteItemProps {
  note: Note;
  onClick: () => void;
  onDelete: (event: React.MouseEvent) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onClick, onDelete }) => {
    return (
      <div className="note-item" onClick={onClick}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <div className="notes-header">
          <button onClick={onDelete}>
            <img src={trashcan} alt="trashcan" />
          </button>
          <img src={pencil} alt="pencil" />
        </div>
      </div>
    );
  };
  
  export default NoteItem;