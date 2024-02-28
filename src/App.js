import './App.css';
import Home from './components/Home/Home';
import Programs from './components/Programs/Programs';
import Reasons from './components/Reasons/Reasons';
import Plans from './components/Plans/Plan';

function App() {
  return (
    <div className="App">
      <Home />
      <Programs />
      <Reasons />
      <Plans />
    </div>
  );
}

export default App;
