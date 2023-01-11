import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// import { GoogleLogout } from "react-google-login";

import { api as auth } from "../services/api/auth.api";

import { LocalStorage } from "../services/cache/LocalStorage.service";
// import Sidebar from "../components/global/Sidebar";

// Icons
import {
	Squares2X2Icon,
	BellIcon,
	ComputerDesktopIcon,
	SunIcon,
	MoonIcon,
	XMarkIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";

const Painel = () => {
	const [redirect, setRedirect] = useState(false);

	const [wrapper, setWrapper] = useState({});

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
			.catch(() => {
				console.log("LOSS");
				setRedirect(<Navigate to='/login' />);
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
					<div className='title'>
						<h1 className='text-xl font-thin dark:text-white lg:text-2xl'>
							Reserve um horário para reunião.
						</h1>
						<span className='text-xs font-thin text-slate-400 dark:text-slate-500 lg:text-base'>
							Em poucos passos, uma sala estará reservada para
							você.
						</span>
					</div>

					<div className='h-screen'>
						<h2 className='text-xl font-thin dark:text-white'>
							Escolha uma sala
						</h2>
						<div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-6'>
							<button
								onClick={() =>
									setWrapper({
										room: {
											component: (
												<WrapperRoom
													title='Sala Principal'
													close={() =>
														setWrapper((prev) => {
															return {
																...prev,
																room: false,
															};
														})
													}
												/>
											),
											status: true,
										},
									})
								}
								className='flex flex-col rounded p-2 shadow-lg duration-100 dark:bg-slate-700 dark:hover:bg-slate-600'
							>
								<span className='dark:text-white'>
									Sala Principal
								</span>
								<span className='text-sm font-thin dark:text-slate-400'>
									8 reservas
								</span>
							</button>
							<button
								onClick={() =>
									setWrapper({
										room: {
											component: (
												<WrapperRoom
													title='Sala 2'
													close={() =>
														setWrapper((prev) => {
															return {
																...prev,
																room: false,
															};
														})
													}
												/>
											),
											status: true,
										},
									})
								}
								className='flex flex-col rounded p-2 shadow-lg duration-100 dark:bg-slate-700 dark:hover:bg-slate-600'
							>
								<span className='dark:text-white'>Sala 2</span>
								<span className='text-sm font-thin dark:text-slate-400'>
									16 reservas
								</span>
							</button>
						</div>
					</div>
				</Screen>

				{wrapper.room?.status && wrapper.room.component}
			</div>
		</div>
	);
};

const WrapperRoom = ({ title, close }) => {
	const date = new Date();

	return (
		<div
			className='fixed top-0 left-0 grid h-screen w-full place-items-center bg-black/40'
			onClick={close}
		>
			<div
				className='container relative mx-auto max-w-[92%] rounded bg-slate-700 p-4 2xl:max-w-7xl'
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
				}}
			>
				<h3 className='text-xl font-light dark:text-white'>{title}</h3>
				<button className='absolute right-4 top-4' onClick={close}>
					<XMarkIcon className='h-6 w-6 text-slate-400 hover:text-slate-200' />
				</button>

				<div className='mt-4'>
					{/* <div className='grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-2'>
						<button
							onClick={() => {}}
							className='dark:bg-slate-600 dark:hover:bg-slate-500 duration-100 rounded p-2 flex flex-col shadow-lg'
						>
							<span className='capitalize dark:text-white font-thin truncate max-w-full'>
								{date.toLocaleDateString(undefined, {
									weekday: "long",
								})}
								,{" "}
								{date.toLocaleDateString(undefined, {
									day: "2-digit",
								})}{" "}
								{date
									.toLocaleDateString(undefined, {
										month: "short",
									})
									.replace(".", "")}{" "}
								{date.toLocaleDateString(undefined, {
									year: "2-digit",
								})}
							</span>
							<div className='w-full flex justify-between items-end'>
								<span className='dark:text-slate-400 font-thin text-sm'>
									Patrícia
								</span>
								<span className='dark:text-slate-400 font-thin text-xs'>
									08:30 - 09:00
								</span>
							</div>
						</button>
						<button
							onClick={() => {}}
							className='dark:bg-slate-600 dark:hover:bg-slate-500 duration-100 rounded p-2 flex flex-col shadow-lg'
						>
							<span className='capitalize dark:text-white font-thin truncate max-w-full'>
								{date.toLocaleDateString(undefined, {
									weekday: "long",
								})}
								,{" "}
								{date.toLocaleDateString(undefined, {
									day: "2-digit",
								})}{" "}
								{date
									.toLocaleDateString(undefined, {
										month: "short",
									})
									.replace(".", "")}{" "}
								{date.toLocaleDateString(undefined, {
									year: "2-digit",
								})}
							</span>
							<div className='w-full flex justify-between items-end'>
								<span className='dark:text-slate-400 font-thin text-sm'>
									Fernando
								</span>
								<span className='dark:text-slate-400 font-thin text-xs'>
									11:30 - 13:00
								</span>
							</div>
						</button>
						<button
							onClick={() => {}}
							className='dark:bg-slate-600 dark:hover:bg-slate-500 duration-100 rounded p-2 flex flex-col justify-between shadow-lg'
						>
							<span className='capitalize dark:text-white font-thin truncate max-w-full'>
								{date.toLocaleDateString(undefined, {
									weekday: "long",
								})}
								,{" "}
								{date.toLocaleDateString(undefined, {
									day: "2-digit",
								})}{" "}
								{date
									.toLocaleDateString(undefined, {
										month: "short",
									})
									.replace(".", "")}{" "}
								{date.toLocaleDateString(undefined, {
									year: "2-digit",
								})}
							</span>
							<div className='w-full flex justify-between items-end'>
								<span className='dark:text-slate-400 font-thin text-sm'>
									Bianca
								</span>
								<span className='dark:text-slate-400 font-thin text-xs'>
									13:00 - 13:45
								</span>
							</div>
						</button>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-3'>
						<button
							onClick={() => {}}
							className='dark:border-2 border-dashed dark:border-slate-600 dark:hover:bg-slate-600 duration-100 rounded p-2 flex flex-col justify-center items-center shadow-lg'
						>
							<PlusIcon className='w-5 h-5 text-slate-400' />
							<span className='text-slate-400 text-sm'>
								Agendar horário
							</span>
						</button>
					</div> */}
				</div>
			</div>
		</div>
	);
};

const Screen = ({ children }) => {
	return (
		<div className='container mx-auto min-h-screen max-w-[92%] space-y-6 md:space-y-12 2xl:max-w-7xl'>
			{children}
		</div>
	);
};

const Menu = ({ children }) => {
	return (
		<div className='sticky top-0 bg-white pt-4 dark:bg-slate-800 lg:pt-8'>
			<div className='container z-40 mx-auto mb-6 flex max-w-[92%] items-start justify-between border-b pb-4 dark:border-slate-600 lg:pb-10 2xl:max-w-7xl'>
				{children}
			</div>
		</div>
	);
};

const Hello = () => {
	const date = new Date();
	return (
		<div className='flex flex-col items-center'>
			<span className='font-thin capitalize dark:text-white lg:text-lg'>
				{date.toLocaleDateString(undefined, { weekday: "long" })},{" "}
				{date.toLocaleDateString(undefined, { day: "2-digit" })}{" "}
				{date
					.toLocaleDateString(undefined, { month: "short" })
					.replace(".", "")}{" "}
				{date.toLocaleDateString(undefined, { year: "2-digit" })}
			</span>
			<span className='text-xs font-thin text-slate-400 dark:text-slate-500 lg:text-sm'>
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
			onBlur={() => setTimeout(() => setOpen(false), 100)}
		>
			<button onClick={handleClick} className='menu-button group'>
				<Squares2X2Icon className='h-6 w-6 p-px duration-300 group-hover:fill-black dark:text-white dark:group-hover:fill-white' />
			</button>

			<ul
				onBlur={() => setOpen(false)}
				className={`absolute top-full left-0 z-40 mt-3 rounded bg-slate-700 py-0.5 text-left shadow-lg duration-200 ${
					!open
						? "-translate-y-1/2 scale-y-0 opacity-0"
						: "scale-y-100 opacity-100"
				}`}
			>
				<li className='cursor-pointer px-4 py-2 text-sm text-slate-400 duration-300 hover:bg-slate-600 hover:text-slate-300'>
					Configurações
				</li>
				<li className='cursor-pointer px-4 py-2 text-sm text-slate-400 duration-300 hover:bg-slate-600 hover:text-slate-300'>
					Configurações
				</li>
				<li className='cursor-pointer px-4 py-2 text-sm text-slate-400 duration-300 hover:bg-slate-600 hover:text-slate-300'>
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
			<BellIcon className='h-6 w-6 origin-[50%_0%] p-px duration-300 group-hover:animate-bellbeating group-hover:fill-black dark:text-white dark:group-hover:fill-white' />
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
			onBlur={() => setTimeout(() => setOpen(false), 100)}
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
				className={`absolute top-full right-0 z-40 mt-3 rounded bg-white py-0.5 text-right shadow-lg duration-200 dark:bg-slate-700 ${
					!open
						? "-translate-y-1/2 scale-y-0 opacity-0"
						: "scale-y-100 opacity-100"
				}`}
			>
				<li className='cursor-pointer px-4 py-2 text-sm text-black duration-300 hover:bg-sky-400 hover:text-white dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-300'>
					Configurações
				</li>
				<li className='cursor-pointer px-4 py-2 text-sm text-black duration-300 hover:bg-sky-400 hover:text-white dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-300'>
					Configurações
				</li>
				<li
					onClick={(e) => {
						// clearTimeout(close)
						// logout()
					}}
					className='group relative cursor-pointer px-4 py-2 text-sm text-black duration-300 hover:bg-sky-400 hover:text-white dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-300'
				>
					Tema
					<ul className='absolute right-full top-0 -translate-y-1/2 translate-x-1/2 scale-0 rounded rounded-tr-none bg-white py-0.5 opacity-0 shadow-lg duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 dark:bg-slate-700'>
						<li
							onClick={() => {
								LocalStorage.set("theme", "light");
								setTheme();
							}}
							className={`relative flex cursor-pointer items-center justify-end gap-2 px-4 py-2 text-sm text-black duration-300 hover:bg-sky-400 hover:text-white dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-300 ${
								LocalStorage.get("theme") === "light"
									? "before:absolute before:left-0 before:h-full before:w-0.5 before:rounded-r-lg before:bg-sky-400 dark:before:bg-slate-400"
									: ""
							}`}
						>
							Light
							<SunIcon className='h-4 w-4' />
						</li>
						<li
							onClick={() => {
								LocalStorage.set("theme", "dark");
								setTheme();
							}}
							className={`relative flex cursor-pointer items-center justify-end gap-2 px-4 py-2 text-sm text-black duration-300 hover:bg-sky-400 hover:text-white dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-300 ${
								LocalStorage.get("theme") === "dark"
									? "before:absolute before:left-0 before:h-full before:w-0.5 before:rounded-r-lg before:bg-sky-400 dark:before:bg-slate-400"
									: ""
							}`}
						>
							Dark
							<MoonIcon className='h-4 w-4' />
						</li>
						<li
							onClick={() => {
								LocalStorage.remove("theme");
								setTheme();
							}}
							className={`relative flex cursor-pointer items-center justify-end gap-2 px-4 py-2 text-sm text-black duration-300 hover:bg-sky-400 hover:text-white dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-300 ${
								!LocalStorage.get("theme")
									? "before:absolute before:left-0 before:h-full before:w-0.5 before:rounded-r-lg before:bg-sky-400 dark:before:bg-slate-400"
									: ""
							}`}
						>
							System
							<ComputerDesktopIcon className='h-4 w-4' />
						</li>
					</ul>
				</li>
				<li
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						logout();
					}}
					className='cursor-pointer border-t px-4 py-2 text-sm text-black duration-300 hover:bg-sky-400 hover:text-white dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-300'
				>
					Deslogar
				</li>
			</ul>
		</div>
	);
};

export default Painel;
