import React from 'react';
import classnames from 'classnames';
import LogoEngelVolkers from '../../assets/images/case-study/engel-and-voelkers.png';
import LogoIrisTV from '../../assets/images/case-study/iris-tv.png';
import Sightmachine from '../../assets/images/case-study/sightmachine.png';
import Verloop from '../../assets/images/case-study/Verloop-Logo-Horizontal-HD.png';
import Bitnami from '../../assets/images/case-study/bitnami.svg';

import Breadcrumbs from '../Breadcrumbs';

import './style.less';

const CASE_STUDIES = {
	'Engel & Völkers': {
		name: 'Engel & Völkers',
		image: LogoEngelVolkers,
	},
	'Iris.tv': {
		name: 'Iris.tv',
		image: LogoIrisTV,
	},
	'Sight Machine': {
		name: 'Sight Machine',
		image: Sightmachine,
	},
	Verloop: {
		name: 'Verloop',
		image: Verloop,
	},
	Bitnami: {
		name: 'Bitnami',
		image: Bitnami,
	},
};

const CaseStudyTemplate = ({ caseStudy, children }) => {
	const PAGE = CASE_STUDIES[caseStudy];

	return (
		<>
			<section className={classnames('caseStudyHeader')}>
				<div className="headerContainer">
					<div className="caseStudyHeader-title">
						<h5>Case Study</h5>
						<h1>{PAGE.name}</h1>
					</div>
					<div className="caseStudyHeader-logo">
						<img src={PAGE.image} alt={PAGE.name} />
					</div>
				</div>
			</section>
			<section className="caseStudyContent">
				<div
					className={classnames('caseStudyContent-text', {
						bitnami: PAGE.name === CASE_STUDIES.Bitnami.name,
					})}
				>
					<Breadcrumbs
						preview={{ link: '/case-studies/', label: 'Case Studies' }}
						current={PAGE.name}
					/>
					{children}
				</div>
			</section>
      <section className={classnames('purpleBackground', 'caseStudyFooter')}>
        <h4>Questions?</h4>
        <p>Let us help you get started</p>
        <a className="btn-purple-light" href="/docs/latest/quick-start/">
          get started
        </a>
        <div className="trademarkUsage">
          <p>
            The Linux Foundation has registered trademarks and uses trademarks.
            For a list of trademarks of The Linux Foundation,
            please see our <a
            href="https://www.linuxfoundation.org/legal/trademark-usage">Trademark
            Usage page</a>.
          </p>
        </div>
      </section>
    </>
  );
};

export default CaseStudyTemplate;
