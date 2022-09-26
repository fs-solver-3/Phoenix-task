import "./styles.scss";
import CustomerTable from "./components/CustomerTable";

/**
 *
 * Welcome to the Data Sorting coding challenge.
 *
 * Load json data from `/public/data.json` and render it in a table
 * using `/public/table.png` design.
 *
 * Make this behaviour reusable.
 *
 * Ask questions & have fun!
 *
 */
function App() {
  return (
    <div className="App">
      <CustomerTable />
    </div>
  );
}

export default App;
