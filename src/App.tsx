import { RouterProvider } from "react-router";
import router from "./navigation/router";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
