import { DynamCmp } from "./DynamCmp.jsx";

export function NoteList({ notes,onEdit }) {
    return (
        <section className="notes-list">
            {notes.map(note => {
                    
             return <DynamCmp key={note.id} note={note} onEdit={onEdit}/>
            })}
        </section>
    )
}