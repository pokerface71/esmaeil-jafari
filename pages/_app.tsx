import "@styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "components/ThemeProvider";

function Application({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <div className="relative z-10">
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Application;
