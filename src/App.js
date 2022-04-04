import AppRouter from "./routes/AppRouter";
import Layout from "./components/layout/Layout";
import "./styles/styles.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header" />
      <Layout>
        <AppRouter />
      </Layout>
    </div>
  );
};

export default App;
