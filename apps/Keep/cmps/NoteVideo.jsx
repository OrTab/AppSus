import { OptionsBar } from "./OptionsBar.jsx";

export function NoteVideo({note,onEdit}){

    
        return(
            <div className={`note ${note.type}`}style={{backgroundColor:note.style.backgroundColor,fontFamily:note.style.fontFamily}}>
            <i className="fa fa-youtube"></i>
            {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
            <iframe src={note.info.value} width="270px" height="185px"allowFullScreen></iframe>
            <OptionsBar note={note} onEdit={onEdit}/>
        </div>
        )
    
    }