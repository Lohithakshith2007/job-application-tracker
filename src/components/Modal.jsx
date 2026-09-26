import { useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ title, onClose, children, size = 'regular' }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className={`modal-card modal-card-${size}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">CareerTracker</span>
            <h2>{title}</h2>
          </div>
          <button className="modal-close" type="button" aria-label="Close dialog" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </section>
    </div>,
    document.body,
  );
}

export default Modal;
