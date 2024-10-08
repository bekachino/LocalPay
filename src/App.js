import CustomButton from "./Components/CustomButton/CustomButton";
import Paper from "./Components/Paper/Paper";
import Input from "./Components/Input/Input";
import './App.css';

function App() {
  return (
    <div className="App">
      <Paper>
        <CustomButton size='large' variant='primary'>Привет</CustomButton>
        <Input placeholder='Hello' color='secondary' size='medium'/>
      </Paper>
    </div>
  );
}

export default App;
