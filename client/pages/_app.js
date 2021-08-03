import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

// next default component

const AppComponent = ({ Component, pageProps, currentuser }) => {
  return <>
    <Header currentUser={currentuser} />
    <Component { ...pageProps } currentuser={currentuser} />
   </>
};

// in a Page context === { req, res }
// in _app context === { Component, ctx: {req, res }}
AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if(appContext.Component.getInitialProps){
    pageProps = appContext.Component.getInitialProps(appContext.ctx)
  }


  return {
    pageProps,
    ...data
  };
};

export default AppComponent;