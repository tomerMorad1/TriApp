const { Link } = ReactRouterDOM;

export class Home extends React.Component {

    state = {
        bookIdx: 0,
        mailIdx: 0,
        keepIdx: 0,
    }

    mailAppImgs = ["./img/mail-app.png", "./img/mail-app1.png", "./img/mail-app2.png", "./img/mail-app3.png"]
    keepAppImgs = ["./img/keep-app.png", "./img/keep-app1.png", "./img/keep-app2.png", "./img/keep-app3.png"]
    bookAppImgs = ["./img/book-app.png", "./img/book-app1.png", "./img/book-app2.png", "./img/book-app3.png"]
    inter;

    setChangeImage = (type) => {
        let idx;
        if (type === 'mail') idx = this.state.mailIdx;
        if (type === 'book') idx = this.state.bookIdx;
        if (type === 'keep') idx = this.state.keepIdx;
        this.inter = setInterval(() => {
            idx++
            if (idx > 3) idx = 0;
            if (type === 'mail') this.setState({ mailIdx: idx });
            if (type === 'book') this.setState({ bookIdx: idx });
            if (type === 'keep') this.setState({ keepIdx: idx });
        }, 1000)
    }

    stopChangeImage = () => {
        clearInterval(this.inter);
    }
    render() {
        return (
            <main className="home" >

                <Link to={'/mail'} className="app-preview app1 clean" onMouseEnter={() => this.setChangeImage('mail')} onMouseLeave={this.stopChangeImage}>
                    <div className="app-img"> <img src={this.mailAppImgs[this.state.mailIdx]} /> </div>
                    <div className="app-info">
                        <h1>TriMail</h1>
                        <h3>An app to manage your emails the best way possible! Tri it, you won't regeret it ;)!</h3>
                    </div>
                </Link>

                <Link to={'/keep'} className="app-preview app2 clean" onMouseEnter={() => this.setChangeImage('keep')} onMouseLeave={this.stopChangeImage}>
                    <div className="app-img"> <img src={this.keepAppImgs[this.state.keepIdx]} /> </div>
                    <div className="app-info">
                        <h1>TriKeep</h1>
                        <h3>An app that will let you keep all of your important thoughts, desires and passions all in one place! </h3>
                    </div>
                </Link>

                <Link to={'/book'} className="app-preview app3 clean" onMouseEnter={() => this.setChangeImage('book')} onMouseLeave={this.stopChangeImage}>
                    <div className="app-img"><img src={this.bookAppImgs[this.state.bookIdx]} /></div>
                    <div className="app-info">
                        <h1>TriBook</h1>
                        <h3>An app that will contain all of your favorite books! add new books, filter thorugh them and ofcouse add reviews!</h3>
                    </div>
                </Link>

                <h1 className="team-head">The Team</h1>
                <div className="team">
                    <div className="member">
                        <div className="member-img"><img src="./img/tomer.jpg" /></div>
                        <div className="member-info">
                            <h1>Tomer Morad</h1>
                            <p>A fullstack developer student at Coding Academy.</p>
                        </div>
                    </div>
                    <div className="member">
                        <div className="member-img"><img src="./img/tommy.jpg" /></div>
                        <div className="member-info">
                            <h1>Tommy Irmia</h1>
                            <p>A fullstack developer student at Coding Academy.</p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}