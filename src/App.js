import { Header } from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import AppControls from './Components/AppControls.js';

function App() {
  return (
    <div className="App">
      <Header size='huge'>ToDo List</Header>
      <AppControls/>

    </div>
  );
}

export default App;
