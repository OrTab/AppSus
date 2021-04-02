
import { TodosCreate } from "./TodosCreate.jsx";

export class NoteCreate extends React.Component {
    state = {
        currNote: {
            type: 'txt',
            inputValue: '',
            label: '',
            id: '',
        },
        placeholder: 'What\'s on your mind..',
        showFileInput: false,
        openTodosModal: false
    }
    componentDidMount() {
        if (this.props.note) {
            this.isEdit()
        }
    }

    isEdit = () => {
        const { note } = this.props
        const currNoteCopy = { ...this.state.currNote }
        currNoteCopy.id = note.id
        currNoteCopy.type = note.type
        if (note.info.label) currNoteCopy.label = note.info.label
        if (note.type !== 'todos') currNoteCopy.inputValue = note.info.value
        this.setState({ currNote: currNoteCopy })
        if (note.type === 'todos')this.setState({openTodosModal:!this.state.openTodosModal})

    }




    setNoteType = (type) => {
        var placeholder = ''
        switch (type) {
            case 'txt':
                placeholder = 'What\'s on your mind..'
                break;
            case 'img':
                placeholder = 'Enter img url..'
                break;
            case 'video':
                placeholder = 'Enter video url..'
                break;
            case 'todos':
                placeholder = 'todos..'
                this.toggleTodosModal()
                break;
        }
        const currNoteCopy = { ...this.state.currNote }
        currNoteCopy.type = type
        currNoteCopy.inputValue = ''
        this.setState({
            currNote: currNoteCopy,
            placeholder,
            showFileInput: (type === 'img') ? !this.state.showFileInput : false
        })
    }

    handleChange = (ev) => {
        const currNoteCopy = { ...this.state.currNote }
        var { value } = ev.target
        if (this.state.currNote.type === 'video') value = value.replace('watch?v=', 'embed/')
        currNoteCopy[ev.target.name] = value
        this.setState({ currNote: currNoteCopy })
    }

    onAddNote = () => {
        const { type, inputValue } = this.state.currNote
        if (!inputValue) return
        if ((type === 'video' || type === 'img') && !inputValue.includes('.com')) {
            const currNoteCopy = { ...this.state.currNote }
            currNoteCopy.inputValue = 'PLEASE ENTER VALID URL OR Change to TEXT NOTE'
            this.setState({ currNote: currNoteCopy })
            return
        }
        this.props.onAddNote(this.state.currNote)
        this.clearInputs()
        if (this.props.closeModal) this.props.closeModal()

    }

    clearInputs = () => {
        const currNoteCopy = { ...this.state.currNote }
        currNoteCopy.inputValue = ''
        currNoteCopy.type = 'txt'
        currNoteCopy.label = ''
        this.setState({ currNote: currNoteCopy, placeholder: 'What\'s on your mind..' })
    }

    onImgInput = (ev) => {
        this.loadImageFromInput(ev)
    }
    loadImageFromInput = (ev) => {
        var reader = new FileReader();
        reader.onload = (ev) => {
            const currNoteCopy = { ...this.state.currNote }
            currNoteCopy.inputValue = ev.target.result
            this.setState({ currNote: currNoteCopy, showFileInput: !this.state.showFileInput })
            this.props.onAddNote(this.state.currNote)
            this.clearInputs()
            if (this.props.closeModal) this.props.closeModal()
    

        }
        reader.readAsDataURL(ev.target.files[0]);
    }

    toggleTodosModal = () => {
        this.setState({ openTodosModal: !this.state.openTodosModal })
        this.clearInputs()
    }

    render() {
        var { type, id } = this.state.currNote
        if (id && type === 'todos') {
            var todoNoteId = id
        }
        return (
            <section className="note-create">
              <TodosCreate note={todoNoteId ? todoNoteId : this.props.note} toggleTodosModal={this.toggleTodosModal} toggleStatus={this.state.openTodosModal} onAddTodos={this.props.onAddTodos} closeModal={this.props.closeModal} />
                <div className="notes-input">
                    <input className="label" type="text" placeholder="Label your note.." onChange={this.handleChange} name="label" value={this.state.currNote.label} />
                    <textarea name="inputValue" cols="30" rows="2" value={this.state.currNote.inputValue} placeholder={this.state.placeholder} onChange={this.handleChange}></textarea>
                    {this.state.showFileInput && <input className="file-input" type="file" name="image" onChange={this.onImgInput} />}
                </div>
                <div className="icons">
                    <i className="fa fa-font" onClick={() => this.setNoteType('txt')}></i>
                    <i className="fa fa-image" onClick={() => this.setNoteType('img')}></i>
                    <i className="fa fa-youtube" onClick={() => this.setNoteType('video')}></i>
                    <i className="fa fa-list-ul" onClick={() => this.setNoteType('todos')}></i>
                    {!this.props.closeModal && <i className="fa fa-plus" onClick={() => this.onAddNote()}></i>}
                    {this.props.closeModal && <i className="fa fa-save" onClick={() => this.onAddNote()}></i>}
                </div>
            </section>
        )
    }
}