import StoreProvider from "../store/store-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <StoreProvider>
      <Component {...pageProps} />
      {/* <footer>&copy; 2022 And4Web.</footer> */}

      </StoreProvider>
    </div>
  );
}

export default MyApp;
