import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@glidejs/glide/dist/css/glide.core.min.css';
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster toastOptions={{
        style: {
          background: "rgb(51 65 85)",
          color: "#fff"
        },
      }}
      />
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </>
  )
}
