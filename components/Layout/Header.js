import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
	return (
		<header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-2 py-1 header-main base-bg">
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
			<Link href="/Esmaeil_jafari-Resume.pdf">
				<a className="px-3 py-2 rounded-md bg-secondary" download>
					Download CV
				</a>
			</Link>
		</header>
	);
}
