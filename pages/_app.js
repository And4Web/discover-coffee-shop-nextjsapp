import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      {/* <footer>&copy; 2022 And4Web.</footer> */}
    </div>
  );
}

export default MyApp;
