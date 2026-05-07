import { ListingsPage } from './features/listings';
import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
// This is the root component of the app.
//
// Responsibility:
// - Render the main page (ListingsPage)
//
// Why this should stay minimal:
// - App should NOT contain business logic
// - App should NOT manage feature state
// - It simply composes top-level pages
//
// As the app grows, this is where routing (React Router) would live.

function App() {
  return (
    <>
      <Navbar />

      <main className="app">
        <ListingsPage />
      </main>

      <Footer />
    </>
  );
}

export default App;