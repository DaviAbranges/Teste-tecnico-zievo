// Modal.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { modalAtom } from '../../store/modal';
import '../../styles/modal/modal.css';
import { BookForm } from '../books/bookForm';

export const Modal: React.FC = () => {
  const [modal, setModal] = useAtom(modalAtom);

  if (!modal.open) return null;

  const handleConfirm = () => {
    if (modal.onConfirm) {
      modal.onConfirm();
    }
    setModal({ ...modal, open: false });
  };

  const handleClose = () => {
    if (modal.onClose) {
      modal.onClose();
    }
    // Fecha o modal após o fechamento
    setModal({ ...modal, open: false });
  };

  const renderContent = () => {
    switch (modal.type) {
      case 'success':
        return (
          <>
            <h2>{modal.title}</h2>
            {modal.message && <p>{modal.message}</p>}
            <button onClick={handleConfirm}>OK</button>
          </>
        );
      case 'error':
        return (
          <>
            <h2>{modal.title}</h2>
            {modal.message && <p>{modal.message}</p>}
            <button onClick={handleConfirm}>Confirmar</button>
            <button onClick={handleClose}>Cancelar</button>
          </>
        );
      case 'form':
        return <BookForm />;
      case 'alert':
      default:
        return (
          <>
            <h2>{modal.title}</h2>
            {modal.message && <p>{modal.message}</p>}
            <button onClick={handleClose}>Entendi</button>
          </>
        );
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className={`${modal.type === 'form' ? 'modal-container--form ' : 'modal-container '}`}
      >
        {renderContent()}
      </div>
    </div>
  );
};
