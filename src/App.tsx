import Hero from "./components/Hero";
import Demo from "./components/Demo";
import "./App.css";

const App = () => {
  return (
    <main className="app_wrapper">
      <div className="">
        <Hero />
        <Demo />
      </div>
    </main>
  );
};

export default App;
