import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@glidejs/glide/dist/css/glide.core.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
