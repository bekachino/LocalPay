import CustomButton from "./Components/CustomButton/CustomButton";
import Paper from "./Components/Paper/Paper";
import './App.css';

function App() {
  return (
    <div className="App">
      <Paper><CustomButton size='large' variant='primary'>Привет</CustomButton></Paper>
    </div>
  );
}

export default App;
