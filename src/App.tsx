import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { Explore, Following, Home, Landing, Test } from "./layouts";
import { AppRoute } from "./util/routes";

const App: FC = () => {
    return (
        <Routes>
            <Route path={AppRoute.Landing} element={<Landing />} />
            <Route path={AppRoute.Home} element={<Home />}>
                <Route path={AppRoute.Test} element={<Test />} />
                <Route path={AppRoute.Explore} element={<Explore />} />
                <Route path={AppRoute.Following} element={<Following />} />
            </Route>
            <Route path="*" element={<div>404</div>} />
        </Routes>
    );
};

export default App;
