import React from 'react';

interface DeleteConfirmationProps {
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onCancelDelete, onConfirmDelete }) => {
  return (
    <div className="overlay">
      <div className="delete-confirmation show">
        <p>Weet je zeker dat je deze notitie wilt verwijderen?</p>
        <p>Dit kan niet ongedaan worden gemaakt</p>
        <button onClick={onCancelDelete}>ANNULEREN</button>
        <button onClick={onConfirmDelete}>VERWIJDEREN</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
