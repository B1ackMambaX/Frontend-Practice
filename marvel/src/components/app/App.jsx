import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "../header/Header";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import('../pages/MainPage')),
	  ComicsPage = lazy(() => import('../pages/ComicsPage')),
	  SingleComicPage = lazy(() => import('../pages/SingleComicPage')),
	  SingleCharacter = lazy(() => import('../pages/SingleCharacter')),
	  Page404 = lazy(() => import('../pages/404'));


const App = () => {
	return (
		<Router>
			<Header/>
			<Suspense fallback={<Spinner/>}>
				<Routes>
					<Route path="/" element={<MainPage/>}/>
					<Route path="/comics" element={<ComicsPage/>}/>
					<Route path="/comics/:comicID" element={<SingleComicPage/>}/>
					<Route path="/characters/:charID" element={<SingleCharacter/>}/>
					<Route path="*" element={<Page404/>}/>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
