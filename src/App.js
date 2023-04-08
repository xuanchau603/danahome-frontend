import { BrowserRouter, Routes, Route } from "react-router-dom";
import publicRoute from "./Routes";
import DefaultLayout from "./Layout/DefautLayout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoute.map((element, index) => {
            const Layout = element.layout || DefaultLayout;

            return (
              <Route
                key={index}
                path={element.path}
                element={
                  <Layout>
                    <element.component></element.component>
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
