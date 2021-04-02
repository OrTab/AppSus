import { mailService } from "../services/mail-service.js";
import { eventBusService } from "../../../services/eventBusService.js"
export class MailCompose extends React.Component {
    state = {
        mail: {
            sendTo: "",
            subject: "",
            body: "",
            isInbox: false,
            isRead: false,
            isDraft: false,
            isTrash: false,
            isStarred: false,
        },
        emptyState: {},
    };
    componentDidMount = () => {
        this.setState({ emptyState: this.state.mail });
        if (this.props.mailToEdit !== null) this.setState({ mail: this.props.mailToEdit})
    };
    setType = (type) => {
        if (type === "send")
            return {
                ...this.state.mail,
                sender: 'Me',
                senderAddress: 'evyatarm@gmail.com',
                isInbox: true,
                isRead: false,
                isDraft: false,
                isSent: true
            };
        if (type === "draft")
            return {
                ...this.state.mail,
                sender: 'Me',
                senderAddress: 'evyatarm@gmail.com',
                isInbox: false,
                isRead: true,
                isDraft: true,
            };
    };

    onSaveMail = (ev, type) => {
        ev.preventDefault();
        if (this.state.mail === this.state.emptyState)
            this.props.onCloseCompose();
        else {
            const mailToSave = this.setType(type);
            mailService.save(mailToSave).then((msg) => {
                eventBusService.emit('show-msg', msg)
                this.setState({ mail: this.state.emptyState });
                this.props.onCloseCompose();
            });
        }
    };

    onInputChange = (ev) => {
        const value = ev.target.value;
        const mail = { ...this.state.mail };
        mail[ev.target.name] = value;
        this.setState({
            mail,
        });
    };

    render() {
        return (
            <div className="mail-compose container">
                <div className="compose-header">
                    <p> New Message </p>
                    <div className="header-controls">
                        <button
                            title="save to drafts"
                            onClick={() => this.onSaveMail(event, "draft")}
                        >
                            {" "}
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <form
                    onSubmit={() => this.onSaveMail(event, "send")}
                    className="mail-compose-form"
                >
                    <div className="compose-address">
                        <input
                            value={this.state.mail.sendTo}
                            type="mail"
                            name="sendTo"
                            placeholder="To"
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className="compose-subject">
                        <input
                            value={this.state.mail.subject}
                            ref={this.elInput}
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            onChange={this.onInputChange}
                        />
                    </div>

                    <div className="compose-body">
                        <textarea
                            value={this.state.mail.body}
                            rows="15"
                            type="text"
                            name="body"
                            placeholder="Write your mail here"
                            onChange={this.onInputChange}
                        />
                    </div>
                    <section className="compose-footer">
                        <button type="submit" title="Send">
                            {" "}
                            Send{" "}
                        </button>
                        <button
                            className="fa fa-trash-o"
                            onClick={() => this.props.onCloseCompose()}
                        ></button>
                    </section>
                </form>
            </div>
        );
    }
}
