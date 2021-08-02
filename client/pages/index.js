import buildClient from "../api/build-client";

// index es el route
const Index = ({currentuser}) => {
  return currentuser ? <h1>Estás logeado</h1> : <h1> No estás logeado</h1>;
};

// Index.getInitialProps = () => {} => fetch some data in the server side rendering process SSR
Index.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default Index;
