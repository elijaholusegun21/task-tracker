import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-black transition-colors dark:bg-slate-900 dark:text-gray-100">
      <AppRouter />
    </div>
  );
}

export default App;