import { eventBusService } from "../../../services/eventBusService.js"
import { OptionsBar } from "./OptionsBar.jsx"

export class NoteTodos extends React.Component {

    state = {

    }

    componentDidMount() {

    }


    render() {
        const { note, onEdit, setMark } = this.props

        return (
            <div className={`note ${note.type}`} style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily}}>
                <i className="fa fa-list-ul"></i>
                <div style={{fontSize:note.style.fontSize+'px'}}>
                    {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
                    {note.info.value.map((todo, idx) => {
                        return <p key={idx}><li onClick={() => {
                            eventBusService.emit('markTodo', { note, idx })
                        }} className={todo.isDone ? 'mark' : ''}>{todo.txt}</li> {todo.doneAt && <span>Done At : {new Date(todo.doneAt).toLocaleTimeString()}</span>}</p>

                    })} </div>

                <OptionsBar note={note} onEdit={onEdit} />
            </div>
        )

    }

}
