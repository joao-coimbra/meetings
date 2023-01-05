import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// import { GoogleLogout } from "react-google-login";

import { api as auth } from "../services/api/auth.api";

import { LocalStorage } from "../services/cache/LocalStorage.service";
// import Sidebar from "../components/global/Sidebar";

// ICONS
import { Squares2X2Icon, BellIcon } from "@heroicons/react/24/outline";

const Painel = () => {
	const [redirect, setRedirect] = useState(false);

	const [user, setUser] = useState({});
	const [oAuth, setAuth] = useState(false);

	useEffect(() => {
		auth.verify(LocalStorage.get(process.env.REACT_APP_COOKIES_TOKEN))
			.then(() => {
				setUser(
					JSON.parse(
						LocalStorage.get(process.env.REACT_APP_COOKIES_USER)
					)
				);
				setAuth(true);
			})
			.catch(() => setRedirect(<Navigate to='/login' />));
	}, []);

	// console.log(user)

	return (
		<div id='meetings' className='dark:bg-slate-800'>
			{redirect}

			<div>
				<Screen>
					<Menu>
						<MenuButton />
						<Hello />
						<LeftMenu>
							<BellButton notification={true} />
							<Avatar logout={() => {
								LocalStorage.remove(process.env.REACT_APP_COOKIES_TOKEN)
								setRedirect(<Navigate to='/login' />)
							}} />
						</LeftMenu>
					</Menu>
				</Screen>
			</div>
		</div>
	);
};

const Screen = ({ children }) => {
	return (
		<div className='min-h-screen container max-w-[92%] 2xl:max-w-7xl mx-auto py-4 lg:py-8'>
			{children}
		</div>
	);
};

const Menu = ({ children }) => {
	return <div className='flex justify-between items-center lg:items-start'>{children}</div>;
};

const Hello = () => {
	const date = new Date();
	return (
		<div className='flex flex-col items-center'>
			<span className='capitalize dark:text-white font-thin lg:text-lg'>
				{date.toLocaleDateString("en", { weekday: "long" })},{" "}
				{date.toLocaleDateString("en", { day: "2-digit" })}{" "}
				{date
					.toLocaleDateString("en", { month: "short" })
					.replace(".", "")}{" "}
				{date.toLocaleDateString("en", { year: "2-digit" })}
			</span>
			<span className='text-xs lg:text-sm dark:text-slate-500'>
				4 reuniões para hoje.
			</span>
		</div>
	);
};

const MenuButton = () => {
	const handleClick = () => {};

	return (
		<button onClick={handleClick} className='menu-button group'>
			<Squares2X2Icon className='w-6 h-6 p-px text-white duration-300 group-hover:fill-white' />
		</button>
	);
};

const LeftMenu = ({ children }) => {
	return <div className='inline-flex space-x-2'>{children}</div>;
};

const BellButton = ({ notification }) => {
	return (
		<button
			className={`menu-button ping group ${
				notification ? "before:animate-ping" : ""
			}`}
		>
			<BellIcon className='w-6 h-6 p-px text-white duration-300 group-hover:fill-white' />
		</button>
	);
};

const Avatar = ({ user, logout }) => {

	const [open, setOpen] = useState(false);

	return (
		<div className='relative max-lg:hidden'>
			<div onClick={() => setOpen(false)} className={`fixed w-screen h-screen left-0 top-0 ${!open ? 'hidden' : 'block'} `}></div>
			<button
				onClick={() => setOpen(prevState => !prevState)}
				className='avatar'
				style={{
					backgroundImage:
						'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-512%2Favatar-375-456327.png&f=1&nofb=1&ipt=69b137234782320a7dd476528bba697c59672b65ebc79bc636a9555d2c3e8509&ipo=images")',
				}}
			></button>
			<ul className={`absolute text-right top-full right-0 rounded mt-2 py-0.5 bg-white shadow-lg duration-200 ${!open ? 'scale-y-0 opacity-0 -translate-y-1/2' : 'scale-y-100 opacity-100'}`}>
				<li className="px-4 py-2 hover:bg-slate-200 duration-300 cursor-pointer text-sm">Configurações</li>
				<li className="px-4 py-2 hover:bg-slate-200 duration-300 cursor-pointer text-sm">Configurações</li>
				<li className="px-4 py-2 hover:bg-slate-200 duration-300 cursor-pointer text-sm">Configurações</li>
				<hr className="h-px bg-black" />
				<li onClick={logout} className="px-4 py-2 hover:bg-slate-200 hover:text-red-600 duration-300 cursor-pointer text-sm">Sair</li>
			</ul>
		</div>
	);
};

export default Painel;
