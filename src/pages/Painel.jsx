import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { GoogleLogout } from "react-google-login";

import { api as auth } from "../services/api/auth.api";

import { LocalStorage } from "../services/cache/LocalStorage.service";
import Sidebar from "../components/global/Sidebar";

const Painel = () => {
	const [redirect, setRedirect] = useState(false);

	const [user, setUser] = useState({});

	useEffect(() => {
		auth.verify()
			.then(() => {
				setUser(JSON.parse(LocalStorage.get("m-user")));
			})
			.catch(() => setRedirect(<Navigate to='/login' />));
	}, []);

	// console.log(user)

	return (
		<div id='painel' className='flex justify-end'>
			{redirect}

			<Sidebar />

			<div className='w-[calc(100vw-200px)] p-8'>asdasd</div>
		</div>
	);
};

export default Painel;
