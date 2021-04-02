
import { OptionsBar } from "./OptionsBar.jsx";

export function NoteTxt({ note,onEdit }) {


    return (
        <div className={`note ${note.type}`} style={{backgroundColor:note.style.backgroundColor,fontFamily:note.style.fontFamily}}>
            <i className="fa fa-font"></i>
            <div style={{fontSize:note.style.fontSize+'px'}}  >
            {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
            <p>{note.info.value}</p></div>
            <OptionsBar note={note} onEdit={onEdit}/>
        </div>
    )

}