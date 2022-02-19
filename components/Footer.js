import styles from './Footer.module.css';

export default function Footer() {
	return (
		<>
			<footer className={styles.footer}>
				front end developer{' '}
				<img src="/netliheart.svg" alt="Netlify Logo" className={styles.logo} />{' '}
				for ever (esmaeil jafari)
			</footer>
		</>
	);
}
