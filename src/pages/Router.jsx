// import { useLayoutEffect, useState } from "react";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Navigate,
} from "react-router-dom";

import Login from "./Login";
import Success from "./Success";

function PageRouter() {
	return (
		<Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/success" element={<Success />} />
            </Routes>
		</Router>
	);
}

export default PageRouter;
