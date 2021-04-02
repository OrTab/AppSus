import { NoteEdit } from "./NoteEdit.jsx";
import { OptionsBar } from "./OptionsBar.jsx";

export function NoteImg({ note ,onEdit}) {

    return (
        <div className={`note ${note.type}`}style={{backgroundColor:note.style.backgroundColor,fontFamily:note.style.fontFamily}}>
            <i className="fa fa-image"></i>
            {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
            <div className="img-container">
            <img src={note.info.value}/>
            </div>
            <OptionsBar note={note} onEdit={onEdit}/>
        </div>
    )

}