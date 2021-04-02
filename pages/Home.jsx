// import { eventBusService } from "../services/eventBusService.js";
const { NavLink, withRouter } = ReactRouterDOM;

export class Home extends React.Component {
    state = {};

    componentDidMount() {}

    render() {
        return (
            <section>
                <div className="hero">
                    <div className="hero-overlay">
                        <h1>AppSus.</h1>
                        <h3>A new home for your apps.</h3>
                    </div>
                    <img
                        src="assets/img/hero-logo.jpg"
                        className="home-hero-image"
                    />
                </div>
                {/* <ul className="main-header-in-home roll-in-right">
                        <li>
                            <NavLink activeClassName="nav-active" to="/mail">
                                <i className="fa fa-envelope"></i>
                                <h4>Mail</h4>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="nav-active" to="/keep">
                                <i className="fa fa-sticky-note"></i>
                                <h4>Keep</h4>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="nav-active" to="/book">
                                <i className="fa fa-book"></i>
                                <h4>Book</h4>
                            </NavLink>
                        </li>
                    </ul> */}
            </section>
        );
    }
}
