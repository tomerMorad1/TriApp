const Router = ReactRouterDOM.HashRouter; ``
const { Route, Switch } = ReactRouterDOM;

import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { NoteApp } from './apps/tri-keep/pages/note-app.jsx'
import { MailApp } from './apps/tri-mail/pages/mail-app.jsx'
import { MailCompose } from './apps/tri-mail/pages/mail-compose.jsx'
import { BookApp } from './apps/tri-books/pages/book-app.jsx'
import { BookDetails } from './apps/tri-books/pages/book-details.jsx'

export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>

            <section >
                <Switch>
                    <Route path="/keep" component={NoteApp} />
                    <Route path="/mail/new-compose/:action?/:emailId?" component={MailCompose} />
                    <Route path="/mail" component={MailApp} />
                    <Route path="/book/:bookId" component={BookDetails} />
                    <Route path="/book" component={BookApp} />
                    <Route path="/" component={Home} />
                </Switch>
            </section>

            <footer>
                <AppFooter />
            </footer>
        </Router>
    );
}



