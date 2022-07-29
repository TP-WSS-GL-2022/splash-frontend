import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "./components";
import { Explore, Following, Home, Test } from "./pages";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="test" element={<Test />} />
                <Route path="explore" element={<Explore />} />
                <Route path="following" element={<Following />} />
            </Route>
        </Routes>
    );
};

export default App;
