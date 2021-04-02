import { mailService } from "../services/mail-service.js";
const { Link } = ReactRouterDOM;

export class MailDetails extends React.Component {
    state = {
        mail: null,
    };

    componentDidMount = () => {
        const { mailId } = this.props.match.params;
        mailService.getById(mailId).then(mail =>{
            this.setState({ mail })
        })
    };

    getStarred = () => {
        return this.state.mail.isStarred ? 'starred' : ''
    }

    goToInbox = () => {
        this.props.history.push("/mail")
    }

    render() {
        const { mail } = this.state
        if (!mail) return <h3>Loading...</h3>
        return (
            <section className="main-mail-container">
                <div className="mail-nav">
                    <i className="fa fa-arrow-left mail-menu-btn md" onClick={this.goToInbox}></i>
                    <div className="mail-nav-right">
                        <i className={`fa fa-star ${this.getStarred()} mail-menu-btn md`} onClick={()=>this.props.onStarMail(mail.id)}></i>
                        <i className="fa fa-trash-o mail-menu-btn md" onClick={()=>{
                            this.props.onRemoveMail(mail.id)
                            this.goToInbox()
                            }}></i>
                        <Link to={`/keep/mail?&mail=${mail.body}`}><i className="fa fa-external-link mail-menu-btn md"></i></Link>
                    </div>
                </div>
                <div className="mail-details-container">
                    <div className="mail-subject">
                        <span>{mail.subject}</span>
                    </div>
                    <div className="mail-sender-time">
                        <div className="mail-sender"><span>{mail.sender}</span><span>{mail.senderAddress}</span></div>
                        <span className="mail-sent-at">{mail.sentAt.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="mail-body">
                        <span>{mail.body}</span>
                    </div>
                </div>
            </section>
        );
    }
}
