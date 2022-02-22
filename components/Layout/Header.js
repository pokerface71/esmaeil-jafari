import Image from 'next/image';

export default function Header({ title }) {
	return (
		<header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full header-main md:px-2 md:py-3 base-bg">
			<div className="header-main--logo ">
				<Image src="/netliheart.svg" width={25} height={25} />
			</div>
			<nav className="header-main--nav">
				<ul className="flex items-center justify-center header-main--nav--ul">
					<li>Home</li>
					<li>About</li>
					<li>Skills</li>
					<li>Experience</li>
					<li>Education</li>
				</ul>
			</nav>
			<button type="button">Download CV</button>
		</header>
	);
}
