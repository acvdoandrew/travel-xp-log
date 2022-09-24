import Index from '../pages/Index';
import Show from '../pages/Show';
import { Routes, Route } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
function Main(props) {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/experiences/:id" element={<Show />} />
      </Routes>
    </main>
  );
}

export default Main;
