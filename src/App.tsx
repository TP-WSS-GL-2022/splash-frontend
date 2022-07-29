import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "./components";
import { Explore, Following, Home, Test } from "./pages";
import { AppRoute } from "./util/routes";

const App: FC = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path={AppRoute.Test} element={<Test />} />
                <Route path={AppRoute.Explore} element={<Explore />} />
                <Route path={AppRoute.Following} element={<Following />} />
            </Route>
            <Route path="*" element={<div>404</div>} />
        </Routes>
    );
};

export default App;
