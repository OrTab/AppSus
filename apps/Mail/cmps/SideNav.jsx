const { Link } = ReactRouterDOM;
export class SideNav extends React.Component {
    state = {};

    checkActive = (btn) => {
        return btn === this.props.activeBtn ? "active-btn" : "";
    };

    isMenuOpen = () => {
        return this.props.isMenuOpen ? "menu-active" : "";
    };

    render() {
        return (
            <nav className={`nav-container ${this.isMenuOpen()}`}>
                <div className="compose-btn-container">
                    <button
                        className="compose-btn"
                        onClick={()=>{
                            this.props.onToggleMenu()
                            this.props.onCompose()
                        }}
                    >
                        <img src="https://simpleicon.com/wp-content/uploads/pencil.svg" />
                        <span>Compose</span>
                    </button>
                </div>
                <i
                    className="nav-close-btn fa fa-times"
                    onClick={() => this.props.onToggleMenu()}
                ></i>
                <div
                    className="nav-ctn"
                    onClick={() => {
                        this.props.onChangeFilter("isInbox");
                        this.props.onToggleMenu();
                    }}
                >
                    <Link
                        className={`nav-btn-container ${this.checkActive(
                            "isInbox"
                        )}`}
                        to="/mail/"
                    >
                        <i className="fa fa-envelope-o"></i>
                        <span className="btn-txt">Inbox</span>
                        <span>{this.props.inboxCount}</span>
                    </Link>
                </div>
                <div
                    className="nav-ctn"
                    onClick={() => {
                        this.props.onChangeFilter("isStarred");
                        this.props.onToggleMenu();
                    }}
                >
                    <Link
                        className={`nav-btn-container ${this.checkActive(
                            "isStarred"
                        )}`}
                        to="/mail/"
                    >
                        <i className="fa fa-star-o"></i>
                        <span className="btn-txt">Starred</span>
                    </Link>
                </div>
                <div
                    className="nav-ctn"
                    onClick={() => {
                        this.props.onChangeFilter("isSent")
                        this.props.onToggleMenu();
                    }}
                >
                    <Link
                        className={`nav-btn-container ${this.checkActive(
                            "isSent"
                        )}`}
                        to="/mail/"
                    >
                        <i className="fa fa-send"></i>
                        <span className="btn-txt">Sent</span>
                    </Link>
                </div>
                <div
                    className="nav-ctn"
                    onClick={() => {
                        this.props.onChangeFilter("isDraft")
                        this.props.onToggleMenu();
                    }}
                >
                    <Link
                        className={`nav-btn-container ${this.checkActive(
                            "isDraft"
                        )}`}
                        to="/mail/"
                    >
                        <i className="fa fa-pencil"></i>
                        <span className="btn-txt">Draft</span>
                    </Link>
                </div>
                <div
                    className="nav-ctn"
                    onClick={() => {
                        this.props.onChangeFilter("isTrash")
                        this.props.onToggleMenu();
                }}
                >
                    <Link
                        className={`nav-btn-container ${this.checkActive(
                            "isTrash"
                        )}`}
                        to="/mail/"
                    >
                        <i className="fa fa-trash-o"></i>
                        <span className="btn-txt">Trash</span>
                        <span>{this.props.trashCount}</span>
                    </Link>
                </div>
            </nav>
        );
    }
}
