import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import {
    Error,
    Explore,
    Following,
    Home,
    Landing,
    MainLayout,
    Profile,
    Settings,
    Test,
} from "./layouts";
import { AppRoute } from "./util/routes";
import "./util/util.css";

const App: FC = () => {
    return (
        <Routes>
            <Route path={AppRoute.Landing} element={<Landing />} />
            <Route path={AppRoute.Home} element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path={AppRoute.Test} element={<Test />} />
                <Route path={AppRoute.Explore} element={<Explore />} />
                <Route path={AppRoute.Following} element={<Following />} />
            </Route>
            <Route path={AppRoute.Profile} element={<MainLayout />}>
                <Route index element={<Profile />} />
                <Route path={AppRoute.Settings} element={<Settings />} />
            </Route>
            
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default App;
