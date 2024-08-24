import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddOrEditJobs from "./components/AddOrEditJobs";
import Layout from "./components/Layout";
import Jobs from "./components/job/Jobs";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/jobs/create" element={<AddOrEditJobs />} />
          <Route path="/jobs/create/:id" element={<AddOrEditJobs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
