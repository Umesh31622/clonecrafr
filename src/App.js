
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// // Components & Pages
// import Layout from './components/Layout';
// import Dashboard from './pages/Dashboard';
// import Templates from './pages/Templates';
// import Categories from './pages/Categories';
// import Users from './pages/Users';
// import Subscriptions from './pages/Subscriptions';
// import PoliticianTemplateManager from './pages/PoliticianTemplateManager';
// import AuthPage from './pages/AuthPage';
// import Politician from './pages/Politician';
// import AdMob from './pages/AdMob'; // ✅ New Import

// // =================== Protected Route ===================
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/authpage" />;
// };

// function App() {
//   const token = localStorage.getItem('token');

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Auth Page */}
//           <Route
//             path="/authpage"
//             element={token ? <Navigate to="/dashboard" /> : <AuthPage />}
//           />

//           {/* Protected Layout */}
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <Layout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Navigate to="/dashboard" />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="templates" element={<Templates />} />
//             <Route
//               path="politician-templates"
//               element={<PoliticianTemplateManager token={localStorage.getItem('token')} />}
//             />
//             <Route path="categories" element={<Categories />} />
//             <Route path="users" element={<Users />} />
//             <Route path="subscriptions" element={<Subscriptions />} />
//             <Route path="politicians" element={<Politician />} />
//             <Route path="admob" element={<AdMob />} /> {/* ✅ Added AdMob Route */}
//           </Route>

//           {/* Fallback */}
//           <Route path="*" element={<Navigate to={token ? '/dashboard' : '/authpage'} />} />
//         </Routes>

//         <ToastContainer position="top-right" autoClose={3000} />
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components & Pages
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Subscriptions from './pages/Subscriptions';
import PoliticianTemplateManager from './pages/PoliticianTemplateManager';
import AuthPage from './pages/AuthPage';
import Politician from './pages/Politician';
import AdMob from './pages/AdMob';
import FrameManager from './pages/FrameManager'; // ✅ New import
import Religious from './pages/Religious';
import Reports from './pages/Reports';


// =================== Protected Route ===================
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/authpage" />;
};

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth Page */}
          <Route
            path="/authpage"
            element={token ? <Navigate to="/dashboard" /> : <AuthPage />}
          />

          {/* Protected Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="templates" element={<Templates />} />
            <Route
              path="politician-templates"
              element={<PoliticianTemplateManager token={localStorage.getItem('token')} />}
            />
            <Route path="categories" element={<Categories />} />
            <Route path="users" element={<Users />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="politicians" element={<Politician />} />
            <Route path="admob" element={<AdMob />} />
            <Route path="religious" element={<Religious />} />
            <Route path="reports" element={<Reports />} />
            <Route path="framemanager" element={<FrameManager />} /> {/* ✅ Added Frame Route */}
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to={token ? '/dashboard' : '/authpage'} />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
