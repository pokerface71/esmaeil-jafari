import Head from 'next/head';
import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';
import Image from 'next/image';
import {
	FaLinkedin,
	FaCalendarDay,
	FaInstagram,
	FaWhatsapp,
	FaPhoneVolume,
	FaMailBulk,
} from 'react-icons/fa';
import {
	DiBootstrap,
	DiCss3,
	DiPhp,
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

			<main className="w-full pt-24">
				<Header />
				<h2 className="text-lg text-center">About Me</h2>
				<div className="flex flex-wrap items-center w-full p-3 sm:m-auto">
					<div className="text-center sm:w-full md:w-5/12">
						<Image
							src="/images/esmaeiljafari.jpg"
							width="300px"
							height="300px"
							className="rounded-full"
						/>
					</div>
					<div className="w-full p-2 sm:w-full md:w-5/12">
						<h1 className="mb-3 text-4xl font-weight:bold">Esmaeil Jafari</h1>
						<p className="flex items-center">
							<FaCalendarDay className="mr-2" />{' '}
							<span>birtday : 16 june 1992</span>
						</p>
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
					<DiPhp className="icon-skill typescript" />
					<Image src="/images/typescript.png" width="46px" height="46px" />
					<DiReact className="icon-skill react" />
					<Image src="/images/redux.png" width="46px" height="46px" />
					<Image src="/images/nextjs.png" width="48px" height="48px" />
					<DiJqueryLogo className="icon-skill jquery" />
					<DiBootstrap className="icon-skill bootstrap" />
					<DiGit className="icon-skill git" />
					<DiPhotoshop className="icon-skill photoshop" />
				</div>
				<div className="flex flex-wrap items-center justify-center">
					<div className="mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium html">HTML</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-html h-2.5 rounded-full"
								style={{ width: '90%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium css">CSS</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-css h-2.5 rounded-full"
								style={{ width: '90%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium sass">SASS</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-sass h-2.5 rounded-full"
								style={{ width: '70%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium js">JavaScript</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-js h-2.5 rounded-full"
								style={{ width: '60%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium typescript">
							TypeScript
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-typescript h-2.5 rounded-full"
								style={{ width: '40%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium react">React js</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-react h-2.5 rounded-full"
								style={{ width: '60%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium redux">Redux</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-redux h-2.5 rounded-full"
								style={{ width: '60%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium text-black">Next js</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-black h-2.5 rounded-full"
								style={{ width: '80%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium jquery">jquery</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-jquery h-2.5 rounded-full"
								style={{ width: '80%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium bootstrap">
							Bootstrap
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-bootstrap h-2.5 rounded-full"
								style={{ width: '95%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium git">git</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-git h-2.5 rounded-full"
								style={{ width: '70%' }}
							></div>
						</div>
					</div>
					<div className="mx-2 mt-3 md:w-3/12">
						<div className="mb-1 text-base font-medium photoshop">
							photoshop
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-photoshop h-2.5 rounded-full"
								style={{ width: '50%' }}
							></div>
						</div>
					</div>
				</div>
				<h2 className="text-lg text-center mt-28">Experience</h2>
				<div className="flex flex-wrap items-center w-full p-3 sm:m-auto">
					<div className="mx-3 mb-3 md:w-5/12 sm:w-full">
						<p className="text-secondary">Frontend Developer</p>
						<p className="flex items-center justify-between">
							<span>ketabplus · Full-time</span>
							<span>Mar 2021 - Present · 1 yr</span>
						</p>
						<p className="text-justify">
							𝘒𝘦𝘵𝘢𝘣𝘗𝘭𝘶𝘴 𝘪𝘴 𝘢 𝘚𝘵𝘢𝘳𝘵-𝘜𝘱 𝘪𝘯 𝘵𝘩𝘦 𝘍𝘪𝘦𝘭𝘥 𝘖𝘧 𝘉𝘰𝘰𝘬𝘴 𝘞𝘩𝘰𝘴𝘦 𝘛𝘢𝘳𝘨𝘦𝘵 𝘐𝘴 𝘛𝘰
							𝘌𝘯𝘤𝘰𝘶𝘳𝘢𝘨𝘦 𝘗𝘦𝘰𝘱𝘭𝘦 𝘛𝘰 𝘉𝘶𝘺 𝘉𝘰𝘰𝘬𝘴 𝘈𝘯𝘥 𝘙𝘦𝘢𝘥 𝘔𝘰𝘳𝘦 <br /> 𝘔𝘺
							𝘙𝘦𝘴𝘱𝘰𝘯𝘴𝘪𝘣𝘪𝘭𝘪𝘵𝘺 𝘪𝘴 𝘙𝘦𝘧𝘢𝘤𝘵𝘰𝘳 . 𝘋𝘦𝘷𝘦𝘭𝘰𝘱 𝘢𝘯𝘥 𝘔𝘢𝘪𝘯𝘵𝘢𝘪𝘯 𝘵𝘩𝘦 𝘞𝘦𝘣𝘚𝘪𝘵𝘦 𝘢𝘯𝘥
							𝘢𝘭𝘴𝘰 𝘪𝘵𝘴 𝘗𝘢𝘯𝘦𝘭. 𝘛𝘩𝘦 𝘛𝘦𝘤𝘩𝘯𝘰𝘭𝘰𝘨𝘪𝘦𝘴 𝘞𝘦 𝘜𝘴𝘦𝘥 𝘐𝘯 𝘛𝘩𝘦𝘴𝘦 2 𝘗𝘳𝘰𝘫𝘦𝘤𝘵𝘦𝘴:
						</p>
						<p>
							𝘛𝘺𝘱𝘦𝘚𝘤𝘳𝘪𝘱𝘵 | 𝘕𝘦𝘹𝘵 𝘫𝘴 | 𝘙𝘦𝘢𝘤𝘵 | 𝘙𝘦𝘥𝘶𝘹-𝘛𝘰𝘰𝘬𝘪𝘵 | 𝘙𝘦𝘢𝘤𝘵𝘉𝘰𝘰𝘵𝘴𝘵𝘳𝘱
							|𝘛𝘢𝘪𝘭𝘞𝘪𝘯𝘥 | 𝘚𝘈𝘚𝘚 | 𝘞𝘰𝘳𝘥𝘗𝘳𝘦𝘴𝘴
						</p>
					</div>
					<div className="mx-3 mb-3 md:w-5/12 sm:w-full">
						<p className="text-secondary">Frontend Developer</p>
						<p className="flex items-center justify-between">
							<span>sandbadcell · Full-time</span>
							<span>Aug 2019 - Feb 2021 · 1 yr 7 mos</span>
						</p>
						<p className="text-justify">
							𝘚𝘢𝘯𝘥𝘉𝘢𝘥𝘊𝘦𝘭𝘭 𝘪𝘴 𝘢 𝘗𝘳𝘰𝘥𝘶𝘤𝘵 𝘰𝘧 𝘢𝘩𝘰𝘰𝘳𝘢 𝘊𝘰𝘮𝘱𝘢𝘯𝘺 𝘛𝘩𝘢𝘵 𝘪𝘴 𝘢 𝘉2𝘉 𝘗𝘭𝘢𝘵𝘧𝘰𝘳𝘮
							<br /> 𝘔𝘺 𝘙𝘦𝘴𝘱𝘰𝘯𝘴𝘪𝘣𝘪𝘭𝘪𝘵𝘺 𝘪𝘴 𝘋𝘦𝘷𝘦𝘭𝘰𝘱 𝘢𝘯𝘥 𝘔𝘢𝘪𝘯𝘵𝘢𝘪𝘯 𝘵𝘩𝘦 𝘞𝘦𝘣𝘚𝘪𝘵𝘦 𝘢𝘯𝘥
							𝘢𝘭𝘴𝘰 𝘪𝘵𝘴 𝘗𝘢𝘯𝘦𝘭. <br /> 𝘛𝘩𝘦 𝘛𝘦𝘤𝘩𝘯𝘰𝘭𝘰𝘨𝘪𝘦𝘴 𝘞𝘦 𝘜𝘴𝘦𝘥 𝘐𝘯 𝘛𝘩𝘦𝘴𝘦 2
							𝘗𝘳𝘰𝘫𝘦𝘤𝘵𝘦𝘴:
						</p>
						<p>
							𝘑𝘲𝘶𝘦𝘳𝘺 | 𝘙𝘦𝘢𝘤𝘵 | 𝘙𝘦𝘥𝘶𝘹 | 𝘙𝘦𝘢𝘤𝘵𝘉𝘰𝘰𝘵𝘴𝘵𝘳𝘢𝘱 | 𝘉𝘰𝘰𝘵𝘴𝘵𝘳𝘢𝘱 | 𝘞𝘰𝘳𝘥𝘱𝘳𝘦𝘴𝘴 |
							𝘗𝘏𝘗
						</p>
					</div>
					<div className="mx-3 mb-3 md:w-5/12 sm:w-full">
						<p className="text-secondary">Frontend Developer</p>
						<p className="flex items-center justify-between">
							<span>seoraz · Full-time</span>
							<span>Feb 2017 - Aug 2019 · 2 yrs 7 mos</span>
						</p>
						<p className="text-justify">
							𝘚𝘦𝘰𝘳𝘢𝘻 𝘪𝘴 𝘢 𝘧𝘶𝘭𝘭𝘺 𝘉𝘶𝘥𝘭𝘦𝘥 𝘚𝘦𝘳𝘷𝘪𝘤𝘦𝘴 𝘗𝘳𝘰𝘷𝘪𝘥𝘦𝘳 𝘖𝘧 𝘞𝘦𝘣 𝘋𝘦𝘴𝘪𝘨𝘯,
							𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘮𝘦𝘯𝘵, 𝘊𝘰𝘳𝘱𝘰𝘳𝘢𝘵𝘦 𝘐𝘥𝘦𝘯𝘵𝘪𝘵𝘺 , 𝘔𝘰𝘣𝘪𝘭𝘦 𝘈𝘱𝘱𝘴 𝘈𝘭𝘰𝘯𝘨 𝘸𝘪𝘵𝘩 𝘚𝘦𝘰 𝘢𝘯𝘥
							𝘚𝘰𝘤𝘪𝘢𝘭 𝘔𝘦𝘥𝘪𝘢 .<br /> 𝘛𝘩𝘦 𝘛𝘦𝘤𝘩𝘯𝘰𝘭𝘰𝘨𝘪𝘦𝘴 𝘢𝘯𝘥 𝘚𝘰𝘧𝘵𝘸𝘢𝘳𝘦 𝘵𝘩𝘢𝘵 𝘞𝘦 𝘜𝘴𝘦𝘥 𝘐𝘯
							𝘛𝘩𝘦𝘴𝘦 𝘗𝘳𝘰𝘫𝘦𝘤𝘵𝘦𝘴:
						</p>
						<p>
							𝘑𝘲𝘶𝘦𝘳𝘺 | 𝘙𝘦𝘢𝘤𝘵 | 𝘉𝘰𝘰𝘵𝘴𝘵𝘢𝘳𝘱 | 𝘗𝘩𝘱 | 𝘞𝘰𝘳𝘥𝘗𝘳𝘦𝘴𝘴 | 𝘖𝘱𝘦𝘯𝘊𝘢𝘳𝘵 | 𝘫𝘰𝘰𝘮𝘭𝘢 |
							𝘗𝘩𝘰𝘵𝘰𝘚𝘩𝘰𝘱 .𝘯𝘦𝘵 𝘔𝘷𝘤
						</p>
					</div>
					<div className="mx-3 mb-3 md:w-5/12 sm:w-full">
						<p className="text-secondary">Frontend Developer</p>
						<p className="flex items-center justify-between">
							<span>WebNegah · Full-time</span>
							<span>Jan 2015 - Jan 2017 · 2 yrs 1 mo</span>
						</p>
						<p className="text-justify">
							𝘞𝘦𝘣𝘕𝘦𝘨𝘢𝘩 𝘪𝘴 𝘢 𝘱𝘳𝘰𝘨𝘳𝘢𝘮𝘮𝘪𝘯𝘨 𝘊𝘰𝘮𝘱𝘢𝘯𝘺 𝘞𝘪𝘵𝘩 20 𝘠𝘦𝘢𝘳𝘴 𝘖𝘧 𝘌𝘹𝘱𝘦𝘳𝘪𝘦𝘯𝘤𝘦
							𝘪𝘯𝘛𝘩𝘪𝘴 𝘍𝘪𝘦𝘭𝘥 . 𝘔𝘺 𝘙𝘦𝘴𝘱𝘰𝘯𝘴𝘪𝘣𝘪𝘭𝘪𝘵𝘺 𝘪𝘯 𝘛𝘩𝘪𝘴 𝘊𝘰𝘮𝘱𝘢𝘯𝘺 𝘞𝘢𝘴 𝘵𝘰 𝘋𝘦𝘴𝘪𝘨𝘯
							𝘞𝘦𝘣𝘴𝘪𝘵𝘦𝘴 𝘈𝘤𝘤𝘰𝘳𝘥𝘪𝘯𝘨 𝘵𝘰 𝘊𝘶𝘴𝘵𝘰𝘮𝘦𝘳 𝘕𝘦𝘦𝘥𝘴. <br /> 𝘛𝘩𝘦 𝘛𝘦𝘤𝘩𝘯𝘰𝘭𝘰𝘨𝘪𝘦𝘴 𝘢𝘯𝘥
							𝘚𝘰𝘧𝘵𝘸𝘢𝘳𝘦 𝘵𝘩𝘢𝘵 𝘞𝘦 𝘜𝘴𝘦𝘥 𝘐𝘯 𝘛𝘩𝘦𝘴𝘦 𝘗𝘳𝘰𝘫𝘦𝘤𝘵𝘦𝘴:
						</p>
						<p>
							𝘞𝘰𝘳𝘥𝘱𝘳𝘦𝘴𝘴 / 𝘋𝘕𝘕 / 𝘚𝘌𝘖 / 𝘑𝘢𝘷𝘢𝘚𝘤𝘳𝘪𝘱𝘵 / 𝘑𝘘𝘶𝘦𝘳𝘺 | 𝘉𝘰𝘰𝘵𝘴𝘵𝘳𝘢𝘱 | 𝘖𝘱𝘦𝘯𝘊𝘢𝘳𝘵
							| 𝘗𝘩𝘰𝘵𝘰𝘚𝘩𝘰𝘱
						</p>
					</div>
					<div className="mx-3 mb-3 md:w-5/12 sm:w-full">
						<p className="text-secondary">Web Designer</p>
						<p className="flex items-center justify-between">
							<span>Vira · Full-time</span>
							<span>Jan 2014 - Jan 2015 · 1 yr 1 mo</span>
						</p>
						<p className="text-justify">
							.𝘞𝘦𝘣 𝘋𝘦𝘴𝘪𝘨𝘯 𝘣𝘺 𝘤𝘮𝘴 ( 𝘞𝘰𝘳𝘥𝘱𝘳𝘦𝘴𝘴, 𝘖𝘱𝘦𝘯𝘊𝘢𝘳𝘵, 𝘋𝘯𝘯)
						</p>
					</div>
				</div>
				<h2 className="mb-3 text-lg text-center mt-28">Social Meida</h2>
				<div className="flex items-center justify-center">
					<a
						href="https://instagram.com/esmaeil_jafari_official"
						className="mx-2"
						target="_blank"
					>
						{' '}
						<FaInstagram className="text-3xl" />
					</a>
					<a
						href="https://www.linkedin.com/in/esmaeil-jafari1992/"
						className="mx-2"
						target="_blank"
					>
						{' '}
						<FaLinkedin className="text-3xl" />
					</a>
					<a
						href="https://api.whatsapp.com/send?phone=989052672239"
						className="mx-2"
						target="_blank"
					>
						{' '}
						<FaWhatsapp className="text-3xl" />
					</a>
					<a href="tel:+989052672239" className="mx-2" target="_blank">
						{' '}
						<FaPhoneVolume className="text-3xl" />
					</a>
					<a
						href="mailto:esmaeiljafari1992@gmail.com"
						className="mx-2"
						target="_blank"
					>
						{' '}
						<FaMailBulk className="text-3xl" />
					</a>
				</div>
			</main>

			<Footer />
		</div>
	);
}
