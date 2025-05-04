import "@styles/main.scss";
import type { AppProps } from "next/app";

function Application({ Component, pageProps }: AppProps) {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default Application;
