import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {lazy, Suspense} from "react";
import Loading from "../loading/Loading";

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const SingleComicsPage = lazy(() => import('../pages/SingleComicsPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))


const App = () => {
        return (
            <div className="app">
                <BrowserRouter>
                    <AppHeader/>
                    <Suspense fallback={<Loading/>}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path='/comics/:id' element={<SingleComicsPage/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </div>
        )
}

export default App;