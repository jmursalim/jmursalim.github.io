import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<div className="p-4 text-muted-foreground font-mono text-sm">Loading...</div>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={
              <Suspense fallback={<div className="p-4 text-muted-foreground font-mono text-sm">Loading...</div>}>
                <Projects />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<div className="p-4 text-muted-foreground font-mono text-sm">Loading...</div>}>
                <Contact />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
