import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Roadblocks from './Roadblocks';
import Hub from './Hub';
import Timeline from './Timeline';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/roadblocks" element={<Roadblocks />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </Router>
  );
}

export default App;
