
import { Colors } from "./Colors.jsx"
const { Link } = ReactRouterDOM;
export class OptionsBar extends React.Component {
    state = {
        showColors: false
    }

    componentDidMount() {

    }
    hideColors = () => {
        this.setState({ showColors: false })
    }


    onEditColor = (color) => {
        this.setState({ showColors: false }, () => {
            this.props.onEdit(this.props.note, color)
        })
    }


    render() {
        return (
            <section>
                <div className="options-bar">
                    <button onClick={() => {
                        { this.setState({ showColors: !this.state.showColors }) }
                    }}><i className="fa fa-paint-brush"></i></button>
                    <button onClick={() => this.props.onEdit(this.props.note, 'pin')}><i className="fa fa-thumb-tack"></i></button>
                    {this.props.toggleStyle && <button onClick={() => this.props.toggleStyle()}><i className="fa fa-text-height"></i></button>}
                <button onClick={() => this.props.onEdit(this.props.note, 'clone')}><i className="fa fa-clone info"></i></button>
                    <button onClick={() => this.props.onEdit(this.props.note, 'openedit')}><i className="fa fa-edit"></i></button>
                    <button onClick={() => this.props.onEdit(this.props.note, 'delete')}><i className="fa fa-trash-o"></i></button>
                    <Link to={`/mail?&keep=${this.props.note.info.value}`}><button onClick={() => this.props.onEdit(this.props.note, 'mail')}><i className="fa fa-envelope"></i></button></Link>
                </div>
                {this.state.showColors && <Colors onEditColor={this.onEditColor} hideColors={this.hideColors} />}
            </section>
        )
    }
}