import { eventBusService } from "../services/eventBusService.js";

export class UserMsg extends React.Component {
    state = {
        msg: '',
        isShown: false,
    };

    componentDidMount() {
        this.unsubscribe = eventBusService.on("show-msg", (msg) => {
            this.setState({
                msg,
                isShown: true,
            });
            setTimeout(() => this.setState({ isShown: false }), 3000);
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            this.state.isShown && <div
                className={`notification ${this.state.isShown ? 'slide-in-right' : 'slide-out-right'
                    }`}
            >
                <i className="fa fa-times msg-close-btn" onClick={() => this.setState({ isShown: false })}></i>
                <h2 className="msg-txt">{this.state.msg}</h2>
            </div>
        );
    }
}
