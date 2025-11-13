import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/login/page";
import Results from "@/pages/results/page";
import Settings from "@/pages/settings/page";
import Load from "@/pages/test/load/page";
import Data from "@/pages/test/data/page";
import History from "@/pages/history/page";
import Test from "@/pages/test/page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/test/load" element={<Load />} />
      <Route path="/test/data" element={<Data />} />
      <Route path="/results" element={<Results />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/history" element={<History />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
