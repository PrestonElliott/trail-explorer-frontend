import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FiMenu as MenuIcon } from 'react-icons/fi'
import { closeNavbar, toggleNavbar } from '../actions/navbar'
import brand_text from '../images/trail-explorer-logo-text.png'
import brand_logo from '../images/trail-explorer-logo-main.png'
import '../stylesheets/Navbar.scss'


class Navibar extends React.Component {

	getClassName = base => ( this.props.navbarOpen ? base+' responsive' : base )

	toggleNavbar = () => toggleNavbar(this.props.dispatch)
	closeNavbar = () => closeNavbar(this.props.dispatch)

	getNavLinks = () => {
		if(this.props.loggedIn) {
			return (
				<Fragment>
					<Link to='/trails' className='nav-link top-link'>
						Trails
					</Link>

					<Link to='/follower-feed' className='nav-link'>
						Follower Feed
					</Link>

					<Link to='/community' className='nav-link'>
						Community
					</Link>

					<Link to='/profile' className='nav-link'>
						Profile
					</Link>

					<div className='nav-link' onClick={()=> this.props.dispatch({ type: 'LOG_OUT' })}>
						Logout
					</div>
				</Fragment>
			)
		}
		else {
			return (
				<Fragment>
					<Link to='/trails' className='nav-link top-link'>
						Trails
					</Link>

					<Link to='/login' className='nav-link'>
						Log In
					</Link>
				</Fragment>
			)
		}
	}


	render() {
		return (
			<Fragment>
				<div className={this.getClassName('navbar')}>
					<Link to='/' className='brand' onClick={this.closeNavbar}>
						<img src={brand_text} className="text-logo" alt="trail-explorer"/>
						<img src={brand_logo} className="image-logo" alt="te-logo"/>
					</Link>

					<div className='menu'>
						{ this.getNavLinks() }
					</div>

					<span className='icon' onClick={this.toggleNavbar}>
						<MenuIcon/>
					</span>
				</div>

				<div className='mobile-menu' onClick={this.closeNavbar}>
					{ this.getNavLinks() }
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.session.loggedIn,
	navbarOpen: state.navbar.navbarOpen
});
export default connect(mapStateToProps)(Navibar);
