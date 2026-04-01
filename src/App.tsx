import { CvPage } from '@/components/CvPage';
import { cvCopy } from '@/data';
import './App.css';

function App() {
  return (
    <main className="app">
      <CvPage data={cvCopy} />
    </main>
  );
}

export default App;
