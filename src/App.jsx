import { DataProvider } from "./context/DataContext";
import { useData } from "./hooks/useData";
import BarChart from "./components/BarChart/BarChart";
import Loading from "./components/Loading/Loading";
import Error from "./components/Error/Error";
import NoData from "./components/NoData/NoData";
import "./App.css";

const ChartWrapper = () => {
  const { data, loading, error } = useData();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!data || data.length === 0) return <NoData />;

  return <BarChart data={data} />;
};

function App() {
  return (
    <DataProvider>
      <div className="App">
        <h1>Data Bar Chart</h1>
        <ChartWrapper />
      </div>
    </DataProvider>
  );
}

export default App;
