import { MailService } from '../services/mail.service.js'
import { eventBusService } from '../../../services/event-bus-service.js'
import { MailPreview } from './mail-preview.jsx'

export class MailList extends React.Component {

    state = {
        emails: [],
    }

    removeEventBus;

    componentDidMount() {
        this.loadEmails()
        this.removeEventBus = eventBusService.on('set-folder', () => {
            this.loadEmails();
        })
    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    loadEmails = () => {
        MailService.query()
            .then((emails) => {
                this.setState({ emails })
            })

    }

    onDeleteEmail = (ev, email) => {
        ev.stopPropagation();
        MailService.deleteEmail(email)
            .then(() => {
                this.loadEmails()
            })
    }

    onStarEmail = (ev, email) => {
        ev.stopPropagation();
        MailService.toggleStar(email.id)
            .then(() => this.loadEmails())

    }

    onToggleRead = (ev, email, isRead) => {
        ev.stopPropagation();
        MailService.toggleRead(email.id, isRead)
        eventBusService.emit('set-read-num', {})
        this.loadEmails();
    }

    render() {
        const { emails } = this.state
        return (
            <section className="mail-list flex">
                {emails.map(email => <MailPreview key={email.id}
                    email={email}
                    onToggleRead={this.onToggleRead}
                    onStarEmail={this.onStarEmail}
                    onDeleteEmail={this.onDeleteEmail}
                    loadEmails={this.loadEmails}
                />)}
                {!emails.length && <div>There are no emails in this file..</div>}
            </section>
        )
    }
}