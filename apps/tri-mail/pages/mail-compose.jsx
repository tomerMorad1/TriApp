import { MailNav } from "../cmps/mail-nav.jsx";
import { MailService } from "../services/mail.service.js";
// import { eventBusService } from "../../services/event-bus-service.js";



export class MailCompose extends React.Component {


    state = {
        email: {
            subject: '',
            to: '',
            cc: '',
            body: '',
        },
        isOpen: false,
    }

    draftInterval;
    timeoutId;

    componentDidMount() {
        this.timeoutId = setTimeout(() => this.setState({ isOpen: true }), 0)
        this.setInputs();
        this.draftInterval = setInterval(this.saveDraft, 5000)
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
        clearInterval(this.draftInterval);
    }

    setInputs = () => {
        const { emailId, action } = this.props.match.params
        if (action === 'new') {
            this.setState({
                email: {
                    subject: '',
                    to: '',
                    cc: '',
                    body: ''
                },
                isOpen: true,
            })
        } else {
            MailService.getEmailById(emailId)
                .then(email => {
                    let { subject, from, cc, body } = email;
                    if (email.isDraft) {
                        this.setState(prevState => ({ email: { ...prevState.email, subject: subject, to: from, body, cc } }))
                        return;
                    }
                    if (action === 'reply') subject = 'Re : ' + subject;
                    else {
                        subject = 'Forwarded : ' + subject;
                        from = ''
                    }
                    const seperator = '\n\n\n\n' + '*'.repeat(40) + '\n <From:' + email.from + '>\n\n'
                    body = seperator + body
                    this.setState(prevState => ({ email: { ...prevState.email, subject: subject, to: from, body, cc } }))
                })
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ email: { ...prevState.email, [field]: value } }));
    };

    onSendEmail = (ev) => {
        ev.preventDefault();
        MailService.sendEmail(this.state.email)
            .then(() => {
                this.setState({ email: { subject: '', to: '', cc: '', body: '' } })
                this.props.history.goBack();
            })
    }

    onBack = (ev) => {
        ev.preventDefault();
        this.props.history.goBack();
        MailService.setDraft()
    }

    saveDraft = () => {
        MailService.saveDraft(this.state.email)
    }

    render() {
        const { subject, to, cc, body } = this.state.email
        return (
            <section className="mail-compose">
                <MailNav />
                <div
                    className={`compose-screen ${(this.state.isOpen) ? 'open' : ''}`}
                    onClick={this.onBack}>
                </div>
                <section className="compose-container">
                    <div className="compose-header">New Email : </div>
                    <form>
                        <label htmlFor='to' className="flex">
                            <input
                                ref={this.inputRef} name='to' id='to'
                                type='text' placeholder='To : ' value={to || ''}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label htmlFor='cc' className="flex">
                            <input
                                ref={this.inputRef} name='cc' id='cc'
                                type='text' placeholder='CC :' value={cc || ''}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label htmlFor='subject' className="flex">
                            <input
                                ref={this.inputRef} name='subject' id='subject'
                                type='text' placeholder='Subject' value={subject || ''}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label htmlFor='body' className="flex">
                            <textarea
                                ref={this.inputRef} name='body' id='body'
                                type='text' placeholder='Enter email here' value={body || ''}
                                onChange={this.handleChange}
                            />
                        </label>
                        <button className="back-btn" onClick={this.onBack}>
                            <img src="././img/back.png" />
                        </button>
                        <button className="send-btn" onClick={this.onSendEmail}>
                            <img src="././img/send.png" />
                        </button>
                    </form>
                </section>

            </section>
        )
    }
}