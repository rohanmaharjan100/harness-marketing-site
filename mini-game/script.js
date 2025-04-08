const domContainer = document.getElementsByClassName('harness-status');
const root = ReactDOM.createRoot(domContainer[0]);

function App() {
  return <div className="bg-yellow-400">Hello WOrld</div>;
}

root.render(<App />);
