import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Suspense, lazy } from 'react';
import TaskList from './components/taskList';

const TaskDetails = lazy(() => import('./components/TaskDetails'));
function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
        <Route path="/" element={<Navigate to="/TaskBoard" replace />} />  
        <Route path="/TaskBoard" element={<TaskList />} />
                <Route
            path="/TaskBoard/:id" 
            element={
              <Suspense fallback={<div>Loading task details...</div>}>
                <TaskDetails />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;