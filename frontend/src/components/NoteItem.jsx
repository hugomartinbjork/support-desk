import { useSelector } from 'react-redux'

const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}
    >
      <h4>
        Note from <span>{note.isStaff ? 'Staff' : user.name} </span>
        <p>{note.text}</p>
        <div className="note-date">
          {new Date(note.createdAt).toLocaleString('en-US')}
        </div>
      </h4>
    </div>
  )
}

export default NoteItem
