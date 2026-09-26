import { MAX_NOTE_LENGTH } from '../data/appData';

function NotesField({ id, name = 'notes', label, value = '', onChange, className = '', textareaClassName = '', placeholder = '', rows = 3 }) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        className={textareaClassName}
        maxLength={MAX_NOTE_LENGTH}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
      />
      <span className="notes-character-count" aria-live="polite">
        {value.length}/{MAX_NOTE_LENGTH} characters
      </span>
    </div>
  );
}

export default NotesField;
