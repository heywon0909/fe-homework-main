import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import ListContainer from "./components/list/ListContainer";


function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <header className="App-header">
       Your fleet
      </header>
      <ListContainer/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
