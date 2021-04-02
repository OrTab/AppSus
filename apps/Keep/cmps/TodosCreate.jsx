
export class TodosCreate extends React.Component {
    state = {
        todos: {
            todosLines: [{ txt: '', isDone: false, doneAt: null }],
            label: '',
            id: ''
        }
    }

    componentDidMount() {
        if (this.props.note) {
            const { note } = this.props
            if (note.type !== 'todos') return
            const todosCopy = { ...this.state.todos }
            todosCopy.todosLines = note.info.value
            todosCopy.label = note.info.label
            todosCopy.id = note.id
            this.setState({ todos: todosCopy })
        }
    }

    clearTodos = () => {
        this.setState({
            todos: {
                todosLines: [{ txt: '', isDone: false, doneAt: null }],
                label: ''
            }
        })
    }


    handleTodosLine = (val, idx) => {
        const line = { txt: '', isDone: false, doneAt: null }
        const todosCopy = { ...this.state.todos }
        if (val === '+') todosCopy.todosLines.push(line)
        else {
            todosCopy.todosLines.splice(idx, 1)
            if (!todosCopy.todosLines.length) this.props.toggleTodosModal()
        }
        this.setState({ todos: todosCopy })
    }

    handleChange = (value, idx) => {
        const todosCopy = { ...this.state.todos }
        todosCopy.todosLines[idx].txt = value
        this.setState({ todos: todosCopy })
    }

    onChangeLabel = (ev) => {
        const todosCopy = { ...this.state.todos }
        todosCopy.label = ev.target.value
        this.setState({ todos: todosCopy })
    }

    render() {
        return (
          this.props.toggleStatus&&<div className="todos-modal open-modal swing-in-top-fwd" >
                <button className="close-btn" onClick={() => {
                    this.clearTodos()
                    this.props.toggleTodosModal()
                }}>X</button>
                <input type="text" placeholder="Label your todos.." value={this.state.todos.label} autoFocus onChange={this.onChangeLabel} name="label" />
                {this.state.todos.todosLines.map((todo, idx) => {
                    return <div className="todoLine" key={idx}>
                        <input type="text" placeholder="Enter your todo.." autoFocus onChange={(ev) => {
                            const { value } = ev.target
                            this.handleChange(value, idx)
                        }} value={todo.txt} />
                        <button className="addTodoLine" onClick={() => this.handleTodosLine('+')}>+</button>
                        <button className="removeTodoLine" onClick={() => this.handleTodosLine('-', idx)}>-</button></div>
                })}
                <button onClick={() => {
                    const { toggleTodosModal, closeModal, onAddTodos } = this.props
                    toggleTodosModal()
                    if (closeModal) closeModal()
                    onAddTodos(this.state.todos)
                    this.clearTodos()
                }}>Add</button>
            </div>
        )
    }

}
