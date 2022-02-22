import Head from 'next/head';
import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';
import Image from 'next/image';
import {
	DiBootstrap,
	DiCss3,
	DiGit,
	DiHtml5,
	DiJavascript,
	DiJqueryLogo,
	DiPhotoshop,
	DiReact,
	DiSass,
} from 'react-icons/di';
export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Esmaeil jafari Resume!</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="pt-24">
				<Header />
				<h2 className="text-lg text-center">About Me</h2>
				<div className="flex items-center w-full p-3">
					<div className="w-full p-2 text-center md:w-5/12">
						<Image
							src="/images/esmaeiljafari.jpg"
							width="300px"
							height="300px"
							className=""
						/>
					</div>
					<div className="w-full p-2 md:w-7/12">
						<p>
							I am a front-end developer with a proven ability to collaborate
							effectively with senior developers. I always enjoy working as a
							team member. I have a strong passion to improve in learning new
							technologies, and using them, adhering to the ethics and rules of
							each set Experience working in programming teams and coordinating
							with colleagues
						</p>
					</div>
				</div>
				<h2 className="text-lg text-center">Skills</h2>
				<div className="flex items-center justify-center w-full p-3">
					<DiHtml5 className="icon-skill html" />
					<DiCss3 className="icon-skill css" />
					<DiSass className="icon-skill sass" />
					<DiJavascript className="icon-skill js" />
					<DiReact className="icon-skill react" />
					<DiJqueryLogo className="icon-skill jquery" />
					<DiBootstrap className="icon-skill bootstrap" />
					<DiGit className="icon-skill git" />
					<DiPhotoshop className="icon-skill photoshop" />
				</div>
			</main>

			<Footer />
		</div>
	);
}
