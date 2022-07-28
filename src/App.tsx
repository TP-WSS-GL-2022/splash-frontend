import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./components";
import { Home, Test } from "./pages";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="test" element={<Test />} />
            </Route>
        </Routes>
    );
};

export default App;
