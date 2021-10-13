const {Link} = ReactRouterDOM;
import { eventBusService } from "../services/event-bus-service.js"

export class UserMsg extends React.Component {

    state = {
      msg: null
    }
    removeEventBus;
    timeoutId;
  
    componentDidMount() {
      this.removeEventBus = eventBusService.on('user-msg', (msg) => {
        this.setState({ msg }, () => {
          if (this.timeoutId) clearTimeout(this.timeoutId)
          this.timeoutId = setTimeout(this.onCloseMsg, 3500)
        })
      })
    }
  
    componentWillUnmount() {
      this.removeEventBus()
    }
  
  
  
    onCloseMsg = () => {
      this.setState({ msg: null })
      clearTimeout(this.timeoutId)
    }
  
  
    render() {
      const { msg } = this.state
      if (!msg) return <React.Fragment></React.Fragment>
      return (
        <section className={`user-msg ${msg.type || 'regular'}`}>
          <button onClick={this.onCloseMsg}>X</button>
          <h1>{msg.header}</h1>
          <h2>{msg.txt}</h2>
          <Link to={msg.to}> <p>{msg.link}</p> </Link>
        </section>
      )
    }
  }