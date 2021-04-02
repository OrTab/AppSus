export class BookFilter extends React.Component {

    state = {
        name: '',
        price: 186
    };

    handleChange = (ev) => {
    
        if (ev.target.name === 'name') this.setState({ name: ev.target.value}, ()=> this.props.onSetFilter(this.state));
        else if (ev.target.name === 'price') this.setState({ price: ev.target.value}, ()=> this.props.onSetFilter(this.state));
        
    };

    render() {
        return <section className="filter-book">
            <h2>Filter Book</h2>
            <input type="text" name="name"
                value={this.state.name}
                placeholder="filter"
                onChange={this.handleChange} />
            <input type="range" name="price"
                min='0' max='200'
                value={this.state.price}
                onChange={this.handleChange} />
        </section>;
    }

}