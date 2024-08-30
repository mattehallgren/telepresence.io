import React, { useState } from 'react';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';

import Platform from '@src/components/Platform';
import MainNav from '@src/components/MainNav';

import './globalHelpers.less';
import './layout.less';
import './docs-layout.less';
import './home.css';

import TelepresenceLogo from '../../assets/images/telepresence-edgy.svg';

export default function Layout({ location, children }) {
	const [open, setOpen] = useState(false);

	const toggleNav = () => setOpen(!open);

	return (
		<Platform.Provider>
			<Helmet>
				<meta
					name="keywords"
					content="Telepresence, Kubernetes, microservices"
				/>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Helmet>

			<header className="header">
				<div className="headerContainer">
					<div className="MobileTop">
						<a href="/" className="LogoLink">
							<img
								src={TelepresenceLogo}
								alt="Telepresence Logo"
								width="32"
								height="32"
							/>
							<p>Telepresence</p>
						</a>
						<button
							onClick={toggleNav}
							className={classnames('Burger', { open: open })}
							aria-label="Open and close menu"
						>
							<span />
							<span />
							<span />
							<span />
						</button>
					</div>
					<nav className="desktopNav">
						<MainNav />
						<a
							className={classnames('btn-purple-light')}
							target="_blank"
							rel="noreferrer"
							href="https://slack.cncf.io/"
						>
							need help?
						</a>
					</nav>
				</div>
				{open && (
					<nav className="nav">
						<MainNav />
						<a
							className={classnames('btn-purple-light', 'needHelpButton')}
							target="_blank"
							rel="noreferrer"
							href="https://slack.cncf.io/"
						>
							need help?
						</a>
					</nav>
				)}
			</header>

			<div className="main-body">{children}</div>
		</Platform.Provider>
	);
}
