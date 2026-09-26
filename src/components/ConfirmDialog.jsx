import Modal from './Modal';

function ConfirmDialog({ title, message, errorMessage, confirmLabel = 'Delete', onCancel, onConfirm }) {
  return (
    <Modal title={title} onClose={onCancel} size="compact">
      <p className="confirm-dialog-message">{message}</p>
      {errorMessage && <p className="confirm-dialog-error" role="alert">{errorMessage}</p>}
      <div className="confirm-dialog-actions">
        <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger" type="button" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
