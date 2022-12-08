// import { useLayoutEffect, useState } from "react";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Navigate,
} from "react-router-dom";

import Login from "./Login";
import Painel from "./Painel";

function PageRouter() {
	return (
		<Router>
            <Routes>
                <Route path="/" element={<Painel />} />
                <Route path="/login" element={<Login />} />
            </Routes>
		</Router>
	);
}

export default PageRouter;
