
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
      <div className="note-item">
        <div className='note-header'>
          <h2>{note.title}</h2>
        </div>
        <div className='note-divider-wrapper'>
          <hr className='note-divider'></hr>
        </div>
        <div className='note-body'onClick={onClick}>
          <p>{note.content}</p>
        </div>
        <div className="notes-footer">
          <button onClick={onDelete}>
            <img src={trashcan} alt="trashcan" />
          </button>
          <button onClick={onClick}> 
            <img src={pencil} alt="pencil" />
          </button>
        </div>
      </div>
    );
  };
  
  export default NoteItem;