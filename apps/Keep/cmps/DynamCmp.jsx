import { NoteImg } from "./NoteImg.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodos } from './NotesTodos.jsx'



export function DynamCmp({ note, onEdit }) {

    switch (note.type) {
        case 'txt':
            return <NoteTxt note={note} onEdit={onEdit} />
        case 'img':
            return <NoteImg note={note} onEdit={onEdit} />
        case 'video':
            return <NoteVideo note={note} onEdit={onEdit} />
        case 'todos':
            return <NoteTodos note={note} onEdit={onEdit} />
    }
    return <p>Yasss</p>
}


