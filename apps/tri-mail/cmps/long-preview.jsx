const { Link } = ReactRouterDOM

import { MailService } from "../services/mail.service.js";

export function LongPreview({ email, onToggleEmailPreview, onDeleteEmail, onToggleRead, onStarEmail }) {
    return (
        <section className="long-preview" onClick={(event) => {
            onToggleEmailPreview()
            onToggleRead(event, email, true)
        }}>
            <button className={`star ${(email.isStar) ? 'fas' : 'far'} fa-star`}
                onClick={(event) => onStarEmail(event, email)}
            ></button>
            <div className="btns">
                <Link to={`mail/${email.id}`}>
                    <button>
                        <img src="././img/expand.png" />
                    </button>
                </Link>
                <button className="read-btn" onClick={(event) => {
                    onToggleEmailPreview()
                    onToggleRead(event, email, !email.isRead)
                }}>
                    <img src={`././img/${(email.isRead) ? 'un' : ''}read.png`} />
                </button>
                <button onClick={(event) => onDeleteEmail(event, email)} >
                    <img src="././img/trash.png" />
                </button>
            </div>
            <div>
                <h1>{email.subject}</h1>
                <h2>{MailService.getName(email.from)} <small>'{email.from}'</small></h2>
            </div>
            <p className="mail-body">
                {MailService.getBody(email.body).map((txt, idx) => <small key={idx}>{txt} <br /></small>)}
            </p>
            <small>{MailService.getDate(email.recievedAt)} </small>
        </section>
    )
}