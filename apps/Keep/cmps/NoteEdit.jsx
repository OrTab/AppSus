import { eventBusService } from "../../../services/eventBusService.js"
import { keepService } from "../services/keep-service.js"
import { NoteCreate } from "./NoteCreate.jsx"
import { OptionsBar } from "./OptionsBar.jsx"
import { TodosCreate } from "./TodosCreate.jsx"

export class NoteEdit extends React.Component {

    state = {
        openEditModal: false,
        note: null,
        showStyle: false,
        noteStyle: {
            fontFamily: '',
            fontSize: 15
        }
    }


    componentDidMount() {
        const { note, action } = this.props.edit
        this.setState({ note: note })
        if (action === 'openedit')
            this.toggleEditModal()
        else this.setEdit(note, action)
       

    }
    componentDidUpdate() {
        if (!this.state.openEditModal){
            this.props.setChanges()
        } 
    }
    
    toggleEditModal = () => {
        this.setState({ openEditModal: !this.state.openEditModal })
    }

    setEdit = (note, action) => {
        keepService.updateNote(note, action).then(() => {
            var keepOpen = (action === 'delete') ? false : true
            this.props.setChanges(keepOpen, !keepOpen)
        })
    }

    setNoteStyle = (ev) => {
        const { noteStyle } = { ...this.state }
        noteStyle[ev.target.name] = ev.target.value
        this.setState({ noteStyle: noteStyle }, () =>
            keepService.setNoteStyle(this.state.noteStyle,this.state.note))
                this.props.setChanges(true)    
    }

    toggleStyle=()=>{
        this.setState({ showStyle: !this.state.showStyle })
    
    }


    render() {
        const { note, openEditModal } = this.state
        if (!note) return <div>Loading..</div>
        const openModalClass = openEditModal ? 'openEditModal' : ''
        const { onAddNote, onAddTodos } = this.props
        return (
            <section className="edit-modal swing-in-top-fwd"  style={{backgroundColor:note.style.backgroundColor,fontFamily:note.style.fontFamily}}>
                <button className="close-editModal-btn" onClick={this.toggleEditModal}><i className="fa fa-times"></i></button>
                <div className={`details ${note.type === 'todos' ? 'todos-edit' : ''}`}>
                {note.info.label && <h5 style={{fontSize:note.style.fontSize+'px'}} className="note-label">{note.info.label}</h5>}
                    {note.type === 'txt' && <p style={{fontSize:note.style.fontSize+'px'}}>{note.info.value}</p>}
                    {note.type === 'img' && <img src={note.info.value} />}
                    {note.type === 'video' && <iframe src={note.info.value} width="270px" height="185px" allowFullScreen></iframe>}
                    <div className="todos-edit"  style={{fontSize:note.style.fontSize+'px'}}>{note.type === 'todos' && note.info.value.map((todo, idx) => {
                        return <p key={idx}><li onClick={() => {
                            eventBusService.emit('markTodo', { note, idx })
                        }} className={todo.isDone ? 'mark' : ''}>{todo.txt}</li> {todo.doneAt && <span>Done At : {new Date(todo.doneAt).toLocaleTimeString()}</span>}</p>
                    })}
                    </div>
                </div>
                {this.state.showStyle && <div className="edit-tools scale-up-hor-right">

                    <input type="range" min="15" max="30" onChange={this.setNoteStyle} name="fontSize" value={this.state.note.style.fontSize} /><span>{this.state.note.style.fontSize}</span>
                    <select name="fontFamily" onChange={this.setNoteStyle}>
                        <option value="Arial, Helvetica, sans-serif">Ariel</option>
                        <option value="Impact, Haettenschweiler">Impact</option>
                        <option value="cursive">Cursive</option>
                        <option value="Segoe UI">Segoe</option>
                        <option value=" 'Helvetica Neue'">Helvetica</option>
                    </select>
                </div>}
                <OptionsBar onEdit={this.setEdit} note={note} toggleStyle={this.toggleStyle} />
               
                <NoteCreate onAddNote={onAddNote} onAddTodos={onAddTodos} note={note} closeModal={this.toggleEditModal} />

            </section>
        )

    }

}