import { About } from './pages/About.jsx';
import { Home } from './pages/Home.jsx';
import { MailApp } from './apps/Mail/MailApp.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';
import { KeepApp } from './apps/Keep/pages/KeepApp.jsx';
import { BookApp } from './apps/Books/pages/book-app.jsx';
import { BookDetails } from './apps/Books/cmps/BookDetails.jsx';


const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;


export class RootCmp extends React.Component {

    render() {
        return (
            <Router>
                <section className="app">
                    <AppHeader/>
                    <Switch>
                        <Route path="/keep" component={KeepApp} />
                        <Route path="/mail" component={MailApp} />
                        <Route path="/book/:bookId" component={BookDetails}/>
                        <Route path="/book" component={BookApp} />
                        <Route path="/about" component={About} />
                        <Route path="/" component={Home} />
                    </Switch>
                </section>
            </Router>
        );
    }
}
