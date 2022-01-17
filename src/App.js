import './App.css';
import Options from './pages/entry/Options';
import SummaryForm from './pages/summary/SummaryForm';

function App() {
  return (
    <div>
      < Options optionType='scoops'  />
      < Options optionType='toppings'  />
      {/* < Options  /> */}
      < SummaryForm />
    </div>
  );
}

export default App;
