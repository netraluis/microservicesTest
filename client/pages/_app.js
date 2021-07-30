import 'bootstrap/dist/css/bootstrap.css';

// next default component

const App = ({ Component, pageProps }) => {
  return <Component { ...pageProps } />
};

export default App;