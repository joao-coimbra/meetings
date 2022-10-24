// import { useLayoutEffect, useState } from "react";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Navigate,
} from "react-router-dom";

import Login from "./Login";

function PageRouter() {
	return (
		<Router>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
		</Router>
	);
}

export default PageRouter;
