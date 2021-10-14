import './App.css';

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <nav className="m-20 p-10 bg-gray-800 rounded-full">
        <span className="font-bold text-white text-2xl">Kaleido Soft Quiz Game.</span>
        <a class="cursor-pointer mx-10 text-white font-bold">Quiz</a>
        <a class="cursor-pointer mx-10 text-white font-bold">Add new Quiz</a>
      </nav>     
    </div>
  );
}

export default App;
