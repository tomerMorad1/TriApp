import { MailService } from "../services/mail.service.js";
import { eventBusService } from "../../../services/event-bus-service.js";

const { Link } = ReactRouterDOM


export class MailNav extends React.Component {

    state = {
        emails: [],
        folder: 'inbox'
    }

    removeEventBus;

    componentDidMount() {
        this.loadEmails();
        this.removeEventBus = eventBusService.on('set-read-num', () => {
            this.loadEmails()
        })
    }

    loadEmails = () => {
        const currFolder = MailService.getFolder()
        MailService.query()
            .then(emails => {
                this.setState({ emails, folder: currFolder })
            })
    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    onSetFolder = (ev, folder) => {
        ev.preventDefault();
        MailService.setFolder(folder);
        this.setState({ folder });
        eventBusService.emit('set-folder', {})
    }


    render() {
        const { folder } = this.state
        return (
            <section className="mail-nav">
                <Link to="/mail/new-compose/new" className="clean">
                    <div className='compose'>
                        <div className="add-img"><img src="././img/add.jpg" /></div>
                        Compose</div>
                </Link>
                {/* <Link to='/mail/inbox'> */}
                <div className={`nav-item inbox ${(folder === 'inbox') ? 'chosen' : ''}`}
                    onClick={(event) => this.onSetFolder(event, 'inbox')}>
                    <div className="inbox-img"><img src="././img/inbox.png" /></div>
                    Inbox
                    <h4>
                        {(MailService.getNumOfUnread()) ? MailService.getNumOfUnread() : ''}
                    </h4>
                </div>
                {/* </Link> */}

                {/* <Link to='/mail/starred'> */}
                <div className={`nav-item ${(folder === 'starred') ? 'chosen' : ''}`}
                    onClick={(event) => this.onSetFolder(event, 'starred')}>
                    <div className="star-img inbox-img"><img src="././img/star.jpg" /></div>
                    Starred</div>
                {/* </Link> */}

                {/* <Link to='/mail/sent'> */}
                <div className={`nav-item sent ${(folder === 'sent') ? 'chosen' : ''}`}
                    onClick={(event) => this.onSetFolder(event, 'sent')}>
                    <div className="seng-img inbox-img"><img src="././img/sent.jpg" /></div>
                    Sent</div>
                {/* </Link> */}

                {/* <Link to='/mail/draft'> */}
                <div className={`nav-item draft ${(folder === 'draft') ? 'chosen' : ''}`}
                    onClick={(event) => this.onSetFolder(event, 'draft')}>
                    <div className="draft-img inbox-img"><img src="././img/draft.png" /></div>
                    Drafts</div>
                {/* </Link> */}

                {/* <Link to='/mail/trash'> */}
                <div className={`nav-item trash ${(folder === 'trash') ? 'chosen' : ''}`}
                    onClick={(event) => this.onSetFolder(event, 'trash')}>
                    <div className="trash-img inbox-img"><img src="././img/trash.png" /></div>
                    Trash</div>
                {/* </Link> */}
            </section>
        )
    }


}