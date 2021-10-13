import { ShortPreview } from './short-preview.jsx'
import { LongPreview } from './long-preview.jsx'

export class MailPreview extends React.Component {

    state = {
        isClicked: false,
    }

    onToggleEmailPreview = () => {
        this.setState({ isClicked: !this.state.isClicked })
    }

    render() {
        const { email, onStarEmail, onToggleRead, onDeleteEmail } = this.props;
        const { isClicked } = this.state;
        return (
            <React.Fragment>
                {!isClicked && <ShortPreview email={email}
                    onStarEmail={onStarEmail}
                    onToggleEmailPreview={this.onToggleEmailPreview}
                    onToggleRead={onToggleRead}
                    onDeleteEmail={onDeleteEmail}
                />}
                {isClicked && <LongPreview email={email}
                    onStarEmail={onStarEmail}
                    onToggleEmailPreview={this.onToggleEmailPreview}
                    onToggleRead={onToggleRead}
                    onDeleteEmail={onDeleteEmail}
                />}
            </React.Fragment>


        )
    }
}