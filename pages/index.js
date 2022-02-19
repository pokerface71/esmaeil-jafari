import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Next.js Starter!</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header title="Welcome to my app!" />
				<div className="text-3xl font-bold underline"> Esmaeil jafari</div>
			</main>

			<Footer />
		</div>
	);
}
