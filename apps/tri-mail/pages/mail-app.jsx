import { MailFilter } from "../cmps/mail-filter.jsx";
import { MailList } from "../cmps/mail-list.jsx";
import { MailNav } from "../cmps/mail-nav.jsx";
import { MailDetails } from "./mail-details.jsx";

const { NavLink, Route } = ReactRouterDOM


export class MailApp extends React.Component {

    render() {
        return (
            <section className="mail-app">
                <MailFilter />
                <MailNav />
                <Route path="/mail/:emailId" component={MailDetails} />
                <Route path="/mail/" component={MailList} />
            </section>
        )
    }
}
