import { NoteCreate } from "../cmps/NoteCreate.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { keepService } from '../services/keep-service.js'
import { eventBusService } from '../../../services/eventBusService.js'
import { UserMsg } from "../../../cmps/UserMsg.jsx"
import { NoteFilter } from "../cmps/Note-Filter.jsx"


export class KeepApp extends React.Component {
    state = {
        notes: null,
        edit: {
            action: '',
            note: null
        },
        mailToKeep: {
            inputValue: new URLSearchParams(window.location.href).get('mail'),
            type: 'txt'

        },
        filterBy: {
            filter: 'new',
            typingFilter: ''
        },
        closeModal: false

    }

    componentDidMount() {
        this.checkMailToKeep()
        this.loadNotes()
        this.unsubscribe = eventBusService.on('markTodo', (lineToMark) => {
            keepService.setTodoMark(lineToMark)
            this.loadNotes()
        })

    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    checkMailToKeep = () => {
        const { mailToKeep } = this.state
        if (mailToKeep.inputValue) this.onAddNote(mailToKeep)
    }



    loadNotes = () => {
        let notesCopy = { ...this.state.notes }
        keepService.query().then(notes => {
            notesCopy = notes
            this.setState({ notes: notesCopy })
        })
    }


    onAddNote = (noteToAdd) => {
        keepService.addNote(noteToAdd).then(() => {
            this.loadNotes()
            if (!noteToAdd.id) eventBusService.emit('show-msg', 'Your Note Is Added!')
            else eventBusService.emit('show-msg', 'Note Edited Successfully')

        })
    }
    onAddTodos = (todosToAdd) => {
        var todos = {
            inputValue: todosToAdd.todosLines,
            type: 'todos',
            label: todosToAdd.label,
            id: (todosToAdd.id) ? todosToAdd.id : ''
        }
        keepService.addNote(todos).then(() => {
            this.loadNotes()
            if (!todosToAdd.id) eventBusService.emit('show-msg', 'Your Note Is Added!')
            else eventBusService.emit('show-msg', 'Note Edited Successfully')
        })
    }

    onEdit = (note, action) => {
        const editCopy = { ...this.state.edit }
        editCopy.action = action
        editCopy.note = note
        this.setState({ edit: editCopy })
    }

    setChanges = (isModalOpen, isDelete) => {
        this.loadNotes()
        if (!isModalOpen) {
            const editCopy = { ...this.state.edit }
            editCopy.note = null
            this.setState({ edit: editCopy })
        }
        if (isDelete) eventBusService.emit('show-msg', 'Your Note Is Deleted!')
    }
    setFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    notesForDispaly = () => {
        const { filterBy, notes } = this.state
        var filteredNotes;
        const filterRegex = new RegExp(filterBy.typingFilter, 'i');
        if (filterBy.filter === 'new') filteredNotes = notes.sort((note1, note2) => note2.createdAt - note1.createdAt)
        else if (filterBy.filter === 'old') filteredNotes = notes.sort((note1, note2) => note1.createdAt - note2.createdAt)
        else if (filterBy.filter === 'lastUpdated') filteredNotes = notes.sort((note2, note1) => note1.updatedAt - note2.updatedAt)
        else if (filterBy.filter === 'label') filteredNotes = notes.filter(note => note.info.label)
        else filteredNotes = notes.filter(note => note.type === filterBy.filter)
        return filteredNotes.filter(note => filterRegex.test(note.info.value) || filterRegex.test(note.info.label))
    }
   

    render() {
        if (!this.state.notes) return <div>Loading..</div>
        const notesForDispaly = this.notesForDispaly()
        const pinnedNotes = notesForDispaly.filter(note => note.isPinned)
        const notes = notesForDispaly.filter(note => !note.isPinned)
        return (

            <section className="keep-app">
                {this.state.closeModal && <section className="closeEditModal" onClick={()=>this.onCloseEditModal()}></section>}
                <NoteCreate onAddNote={this.onAddNote} onAddTodos={this.onAddTodos} />
            
                <NoteFilter setFilter={this.setFilter} />
                <div className="note-pin">
                <NoteList notes={pinnedNotes} onEdit={this.onEdit} />
                <i className="fa fa-thumb-tack"></i>
            
                </div>
                <NoteList notes={notes} onEdit={this.onEdit} />
                {this.state.edit.note && <NoteEdit edit={this.state.edit}  setChanges={this.setChanges} onEdit={this.onEdit} onAddNote={this.onAddNote} onAddTodos={this.onAddTodos} />}
                <UserMsg />
            </section>
        )
    }
}