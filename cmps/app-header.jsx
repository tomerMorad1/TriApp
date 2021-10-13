const { NavLink, Link } = ReactRouterDOM;

export class AppHeader extends React.PureComponent {

    state = {
        isNavDown: false,
    }

    onToggleNav = () => {
        this.setState({ isNavDown: !this.state.isNavDown });
    }

    render() {
        const { isNavDown } = this.state
        return (<section className="app-header">
            <Link to={'/'} className="main-logo clean">
                <img src="./img/logo.png" />
                <h1>TriApp</h1>
            </Link>
            <div className={`logos ${(isNavDown) ? 'nav-down' : ''}`} >
                <NavLink to={'/mail'} className="mail-logo"><img src="./img/maillogo.png" /></NavLink>
                <NavLink to={'/keep'} className="keep-logo"><img src="./img/keeplogo.png" /></NavLink>
                <NavLink to={'/book'} className="book-logo"><img src="./img/booklogo.png" /></NavLink>
            </div>
            <button onClick={this.onToggleNav} className={`btn-toggle-nav fas fa-caret-square-${isNavDown ? 'up' : 'down'}`} ></button>
        </section>
        )
    }
}
//