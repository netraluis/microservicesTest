import 'bootstrap/dist/css/bootstrap.css';

// next default component

export default ({ Component, pageProps }) => {
  return <Component { ...pageProps } />
};