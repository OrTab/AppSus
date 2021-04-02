const { NavLink, withRouter } = ReactRouterDOM;

export class AppHeader extends React.Component {
    state = {
        isNavOpen: false,
    };

    componentDidMount() {}

    render() {
        return (
            <header className="app-header">
                <div>
                    <NavLink className="logo" exact to="/">
                        <img src="assets/img/final.png" alt="" />
                    </NavLink>
                </div>
                <nav>
                    <i
                        className="fa fa-th menu-nav-icon"
                        onClick={() =>
                            this.setState({ isNavOpen: !this.state.isNavOpen })
                        }
                    ></i>
                    {this.state.isNavOpen && <ul className="main-header-container roll-in-right">
                        <li onClick={() => this.setState({ isNavOpen: false })}>
                            <NavLink activeClassName="nav-active" to="/mail">
                                <i className="fa fa-envelope"></i>
                                <h4>Mail</h4>
                            </NavLink>
                        </li>
                        <li onClick={() => this.setState({ isNavOpen: false })}>
                            <NavLink activeClassName="nav-active" to="/keep">
                                <i className="fa fa-sticky-note"></i>
                                <h4>Keep</h4>
                            </NavLink>
                        </li>
                        <li onClick={() => this.setState({ isNavOpen: false })}>
                            <NavLink activeClassName="nav-active" to="/book">
                                <i className="fa fa-book"></i>
                                <h4>Book</h4>
                            </NavLink>
                        </li>
                    </ul>}
                </nav>
            </header>
        );
    }
}
