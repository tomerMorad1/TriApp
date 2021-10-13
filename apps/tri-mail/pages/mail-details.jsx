import { MailNav } from "../cmps/mail-nav.jsx";
import { MailService } from "../services/mail.service.js";

const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {

    state = {
        chosenEmail: null,
        emails: [],
        folder: MailService.getFolder(),
        isOpen: false,
    }

    timeoutId;

    componentDidMount() {
        this.loadEmail();
        this.timeoutId = setTimeout(() => this.setState({ isOpen: true }), 0)
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId)
    }

    loadEmail = () => {
        const id = this.props.match.params.emailId
        MailService.getEmailById(id)
            .then(email => {
                if (!email) this.props.history.push('/')
                this.setState({ chosenEmail: email })
            })
    }

    onBack = () => {
        this.props.history.push('/mail')
    }

    onToggleRead = (email) => {
        email.isRead = !email.isRead
        MailService.toggleRead(email.id, email.isRead)
        this.onBack();
    }

    onDeleteEmail = (email) => {
        MailService.deleteEmail(email)
        this.onBack();
    }

    render() {
        const { chosenEmail } = this.state;
        if (!chosenEmail) return <div>Loading..</div>
        return (
            <main className="mail-details">

                <div
                    className={`details-screen ${(this.state.isOpen) ? 'open' : ''}`}
                    onClick={this.onBack}>
                </div>

                <section className="mail-info">
                    <div className="top-btns">
                        <button className="back-btn" onClick={() => this.onBack()}>
                            <img src="././img/back.png" />
                        </button>
                        <div>
                            <button className="unread-btn" onClick={() => this.onToggleRead(chosenEmail)}>
                                <img src="././img/unread.png" />
                            </button>
                            <button className="delete-btn" onClick={() => this.onDeleteEmail(chosenEmail)}>
                                <img src="././img/trash.png" />
                            </button>
                        </div>
                    </div>

                    <div className="mail-body">
                        <h1>{chosenEmail.subject}</h1>
                        <h2><span>From :</span> {MailService.getName(chosenEmail.from)} <small>'{chosenEmail.from}'</small></h2>
                        <h2><span>To :</span> {MailService.getName(chosenEmail.to)} <small>'{chosenEmail.to}'</small></h2> <br />
                        <p className="mail-body">
                            {MailService.getBody(chosenEmail.body).map((txt, idx) => <small key={idx}>{txt} <br /></small>)}
                        </p>
                        <small className="date">{MailService.getDate(chosenEmail.recievedAt)}</small>
                    </div>

                    <div className="bottom-btns">
                        {!chosenEmail.isDraft && <Link to={`/mail/new-compose/reply/${chosenEmail.id}`}>
                            <button className="reply-btn" onClick={this.onBack}>
                                <img src="././img/reply.png" /></button></Link>}
                        <Link to={`/mail/new-compose/forward/${chosenEmail.id}`}>
                            <button className="forward-btn" onClick={this.onBack}>
                                <img src="././img/forward.png" /></button></Link>
                    </div>

                </section>

            </main >
        )
    }
}