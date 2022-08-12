import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import { UserProvider } from "./context/UserContext"

import {
    Error,
    Explore,
    Following,
    Home,
    Landing,
    MainLayout,
    Profile,
    Settings,
    Streaming
} from "./layouts"
import { AppRoute } from "./util/routes"
import "./util/util.css"

const App: FC = () => {
    return (
        <UserProvider>
            <Routes>
                <Route path={AppRoute.Landing} element={<Landing />} />
                <Route path={AppRoute.Home} element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path={AppRoute.Explore} element={<Explore />} />
                    <Route path={AppRoute.Following} element={<Following />} />
                    <Route
                        path={`${AppRoute.Live}/:userId`}
                        element={<Streaming />}
                    />
                </Route>
                <Route path={AppRoute.Profile} element={<MainLayout />}>
                    <Route index element={<Profile />} />
                    <Route path={AppRoute.Settings} element={<Settings />} />
                </Route>

                <Route path="*" element={<Error />} />
            </Routes>
        </UserProvider>
    );
};

export default App;
