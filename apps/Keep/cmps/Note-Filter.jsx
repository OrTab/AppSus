export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            filter: 'new',
            typingFilter: ''
        }

    }
    handleChange=(ev)=>{
        const filterByCopy = {...this.state.filterBy}
        filterByCopy[ev.target.name]=ev.target.value
        this.setState({filterBy:filterByCopy},()=>{
            this.props.setFilter(this.state.filterBy)
         })

    }

    render() {
        return (
            <section className="note-filter">
                <input type="text" placeholder="Type to filter" name="typingFilter" onChange={this.handleChange}/>
                <select name="filter" onChange={this.handleChange} >
                    <option value="new">New</option>
                    <option value="old">Old</option>
                    <option value="new">All</option>
                    <option value="label">Label</option>
                    <option value="txt">Text</option>
                    <option value="todos">Todos</option>
                    <option value="img">Image</option>
                    <option value="video">Video</option>
                    <option value="lastUpdated">Last Updated</option>
                </select>
            </section>
        )
    }
}