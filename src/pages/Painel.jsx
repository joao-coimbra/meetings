import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// import { GoogleLogout } from "react-google-login";

import { api as auth } from "../services/api/auth.api";

import { LocalStorage } from "../services/cache/LocalStorage.service";
// import Sidebar from "../components/global/Sidebar";

// ICONS
import {
	Squares2X2Icon,
	BellIcon,
	ComputerDesktopIcon,
	SunIcon,
	MoonIcon,
} from "@heroicons/react/24/outline";

const Painel = () => {
	const [redirect, setRedirect] = useState(false);

	const [user, setUser] = useState({});
	const [oAuth, setAuth] = useState(false);

	useEffect(() => {
		auth.verify(LocalStorage.get(process.env.REACT_APP_COOKIES_TOKEN))
			.then(() => {
				console.log('SUCCESS')
				setUser(
					JSON.parse(
						LocalStorage.get(process.env.REACT_APP_COOKIES_USER)
					)
				);
				setAuth(true);
			})
			.catch(() => {
				console.log('LOSS')
				setRedirect(<Navigate to='/login' />)
			});
	}, []);

	// console.log(user)

	return (
		<div id='meetings' className='dark:bg-slate-800'>
			{redirect}

			<div>
				<Menu>
					<MenuButton />
					<Hello />
					<LeftMenu>
						<BellButton notification={true} />
						<Avatar
							logout={() => {
								LocalStorage.remove(
									process.env.REACT_APP_COOKIES_TOKEN
								);
								setRedirect(<Navigate to='/login' />);
							}}
						/>
					</LeftMenu>
				</Menu>
				<Screen>
					{/* <hr className="my-6 opacity-20 sticky top-32 z-40" /> */}
					<h1 className='dark:text-white text-xl lg:text-2xl font-thin'>
						Reserve um horário para reunião.
					</h1>
					<span className='text-slate-400 dark:text-slate-500 text-xs lg:text-base font-thin'>
						Em poucos passos, uma sala estará reservada para você.
					</span>
					<div className='h-screen'></div>
				</Screen>
			</div>
		</div>
	);
};

const Screen = ({ children }) => {
	return (
		<div className='min-h-screen container max-w-[92%] 2xl:max-w-7xl mx-auto'>
			{children}
		</div>
	);
};

const Menu = ({ children }) => {
	return (
		<div className='sticky top-0 bg-white dark:bg-slate-800 pt-4 lg:pt-8'>
			<div className='container max-w-[92%] 2xl:max-w-7xl mx-auto pb-4 lg:pb-10 border-b dark:border-slate-600 mb-6 flex justify-between items-start z-40'>
				{children}
			</div>
		</div>
	);
};

const Hello = () => {
	const date = new Date();
	return (
		<div className='flex flex-col items-center'>
			<span className='capitalize dark:text-white font-thin lg:text-lg'>
				{date.toLocaleDateString(undefined, { weekday: "long" })},{" "}
				{date.toLocaleDateString(undefined, { day: "2-digit" })}{" "}
				{date
					.toLocaleDateString(undefined, { month: "short" })
					.replace(".", "")}{" "}
				{date.toLocaleDateString(undefined, { year: "2-digit" })}
			</span>
			<span className='text-xs lg:text-sm font-thin text-slate-400 dark:text-slate-500'>
				4 reuniões para hoje.
			</span>
		</div>
	);
};

const MenuButton = () => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen((prev) => !prev);
	};

	return (
		<div
			className='relative'
			onBlur={() => setTimeout(() => setOpen(false), 40)}
		>
			<button onClick={handleClick} className='menu-button group'>
				<Squares2X2Icon className='w-6 h-6 p-px dark:text-white duration-300 group-hover:fill-black dark:group-hover:fill-white' />
			</button>

			<ul
				onBlur={() => setOpen(false)}
				className={`z-40 absolute text-left top-full left-0 rounded mt-3 py-0.5 bg-slate-700 shadow-lg duration-200 ${
					!open
						? "scale-y-0 opacity-0 -translate-y-1/2"
						: "scale-y-100 opacity-100"
				}`}
			>
				<li className='px-4 py-2 text-slate-400 hover:bg-slate-600 hover:text-slate-300 duration-300 cursor-pointer text-sm'>
					Configurações
				</li>
				<li className='px-4 py-2 text-slate-400 hover:bg-slate-600 hover:text-slate-300 duration-300 cursor-pointer text-sm'>
					Configurações
				</li>
				<li className='px-4 py-2 text-slate-400 hover:bg-slate-600 hover:text-slate-300 duration-300 cursor-pointer text-sm'>
					Outros
				</li>
			</ul>
		</div>
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
			<BellIcon className='w-6 h-6 p-px dark:text-white duration-300 group-hover:fill-black dark:group-hover:fill-white' />
		</button>
	);
};

const Avatar = ({ user, logout }) => {
	const [open, setOpen] = useState(false);

	const setTheme = () =>
		LocalStorage.get("theme") === "dark" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
			? document.documentElement.classList.add("dark")
			: document.documentElement.classList.remove("dark");

	return (
		<div
			className='relative max-lg:hidden'
			onBlur={() => setTimeout(() => setOpen(false), 40)}
		>
			<button
				onClick={() => setOpen((prevState) => !prevState)}
				className='avatar'
				style={{
					backgroundImage:
						'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-512%2Favatar-375-456327.png&f=1&nofb=1&ipt=69b137234782320a7dd476528bba697c59672b65ebc79bc636a9555d2c3e8509&ipo=images")',
				}}
			></button>
			<ul
				className={`z-40 absolute text-right top-full right-0 rounded mt-3 py-0.5 bg-white dark:bg-slate-700 shadow-lg duration-200 ${
					!open
						? "scale-y-0 opacity-0 -translate-y-1/2"
						: "scale-y-100 opacity-100"
				}`}
			>
				<li className='px-4 py-2 text-black dark:text-slate-400 hover:bg-sky-400 hover:text-white dark:hover:bg-slate-600 dark:hover:text-slate-300 duration-300 cursor-pointer text-sm'>
					Configurações
				</li>
				<li className='px-4 py-2 text-black dark:text-slate-400 hover:bg-sky-400 hover:text-white dark:hover:bg-slate-600 dark:hover:text-slate-300 duration-300 cursor-pointer text-sm'>
					Configurações
				</li>
				<li
					onClick={(e) => {
						// clearTimeout(close)
						// logout()
					}}
					className='group relative px-4 py-2 text-black dark:text-slate-400 hover:bg-sky-400 hover:text-white dark:hover:bg-slate-600 dark:hover:text-slate-300 duration-300 cursor-pointer text-sm'
				>
					Tema
					<ul className='scale-0 opacity-0 -translate-y-1/2 translate-x-1/2 group-hover:scale-100 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0 absolute right-full top-0 rounded rounded-tr-none py-0.5 bg-white dark:bg-slate-700 shadow-lg duration-200'>
						<li
							onClick={() => {
								LocalStorage.set("theme", "light");
								setTheme();
							}}
							className={`flex items-center justify-end gap-2 px-4 py-2 text-black dark:text-slate-400 hover:bg-sky-400 hover:text-white dark:hover:bg-slate-600 dark:hover:text-slate-300 duration-300 cursor-pointer text-sm relative ${
								LocalStorage.get("theme") === "light"
									? "before:absolute before:h-full before:left-0 before:w-0.5 before:bg-sky-400 dark:before:bg-slate-400 before:rounded-r-lg"
									: ""
							}`}
						>
							Light
							<SunIcon className='w-4 h-4' />
						</li>
						<li
							onClick={() => {
								LocalStorage.set("theme", "dark");
								setTheme();
							}}
							className={`flex items-center justify-end gap-2 px-4 py-2 text-black dark:text-slate-400 hover:bg-sky-400 hover:text-white dark:hover:bg-slate-600 dark:hover:text-slate-300 duration-300 cursor-pointer text-sm relative ${
								LocalStorage.get("theme") === "dark"
									? "before:absolute before:h-full before:left-0 before:w-0.5 before:bg-sky-400 dark:before:bg-slate-400 before:rounded-r-lg"
									: ""
							}`}
						>
							Dark
							<MoonIcon className='w-4 h-4' />
						</li>
						<li
							onClick={() => {
								LocalStorage.remove("theme");
								setTheme();
							}}
							className={`flex items-center justify-end gap-2 px-4 py-2 text-black dark:text-slate-400 hover:bg-sky-400 hover:text-white dark:hover:bg-slate-600 dark:hover:text-slate-300 duration-300 cursor-pointer text-sm relative ${
								!LocalStorage.get("theme")
									? "before:absolute before:h-full before:left-0 before:w-0.5 before:bg-sky-400 dark:before:bg-slate-400 before:rounded-r-lg"
									: ""
							}`}
						>
							System
							<ComputerDesktopIcon className='w-4 h-4' />
						</li>
					</ul>
				</li>
				<li
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						logout();
					}}
					className='px-4 py-2 border-t dark:border-slate-800 text-black dark:text-slate-400 hover:bg-sky-400 hover:text-white dark:hover:bg-slate-600 dark:hover:text-slate-300 duration-300 cursor-pointer text-sm'
				>
					Deslogar
				</li>
			</ul>
		</div>
	);
};

export default Painel;
