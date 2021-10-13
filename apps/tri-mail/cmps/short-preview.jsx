import { MailService } from "../services/mail.service.js";
import { LongTxt } from "../../../cmps/long-txt.jsx"


export class ShortPreview extends React.Component {
    state = {
        isHover: false,
        txtLength: 30,
    }


    componentDidMount() {
        window.addEventListener('resize', this.getTextLength)
        this.getTextLength()
    }


    getTextLength = () => {
        let length = this.getWindowSize()
        this.setState({ txtLength: length })
    }


    getWindowSize = () => {
        const windowSize = window.innerWidth
        if (windowSize > 1600) return 70
        if (windowSize > 1400) return 50
        if (windowSize > 1200) return 40
        if (windowSize > 1000) return 30
        if (windowSize > 900) return 20
        if (windowSize > 800) return 10
        if (windowSize > 620) return 70
        if (windowSize > 520) return 50
        if (windowSize > 420) return 30
        return 15
    }

    render() {

        const { isHover, txtLength } = this.state;
        const { email, onToggleEmailPreview, onToggleRead, onDeleteEmail, onStarEmail } = this.props;
        return (
            <section className={`mail-preview ${(email.isRead) ? 'read' : ''}`} onClick={(event) => {
                onToggleEmailPreview()
                onToggleRead(event, email, true)
            }}
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })} >
                <div className={`star ${(email.isStar) ? 'fas' : 'far'} fa-star`}
                    onClick={(event) => onStarEmail(event, email)}
                ></div>
                <h1 className="from">{MailService.getName(email.from)}</h1>
                <div className="mail-info">
                    <h1>{email.subject} - </h1>
                    <p><LongTxt txt={email.body} txtLength={txtLength} /></p>
                </div>
                {!isHover && <h1 className="date">{MailService.getDate(email.recievedAt)}</h1>}
                {isHover &&
                    <div className="btns">
                        <button className="read-btn" onClick={(event) => onToggleRead(event, email, !email.isRead)}>
                            <img src={`././img/${(email.isRead) ? 'un' : ''}read.png`} />
                        </button>
                        <button className="trash-btn" onClick={(event) => onDeleteEmail(event, email)}>
                            <img src="././img/trash.png" />
                        </button>
                    </div>}
            </section>
        )
    }
}