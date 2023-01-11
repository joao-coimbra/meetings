import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { api as auth } from "../services/api/auth.api";
import { LocalStorage } from "../services/cache/LocalStorage.service";

import {
	UserIcon,
	LockClosedIcon,
	EyeIcon,
	EyeSlashIcon,
} from "@heroicons/react/24/solid";

function Login() {
	const [redirect, setRedirect] = useState(false);

	const [user, setUser] = useState("");
	const [pw, setPw] = useState("");

	useEffect(() => {
		auth.verify(LocalStorage.get(process.env.REACT_APP_COOKIES_TOKEN))
			.then(() => {
				// console.log(res)
				setRedirect(<Navigate to='/' />);
			})
			.catch(() =>
				LocalStorage.remove(process.env.REACT_APP_COOKIES_USER)
			);
	}, []);

	const handleSubmit = (e) => {
		auth.signin(
			user.includes("@") ? user : user + "@linear.net.br",
			pw
		).then((res) => {
			LocalStorage.set(
				process.env.REACT_APP_COOKIES_USER,
				JSON.stringify(res.data.user)
			);
			LocalStorage.set(
				process.env.REACT_APP_COOKIES_TOKEN,
				res.data.token
			);
			setRedirect(<Navigate to='/' />);
		});

		e.preventDefault();
	};

	return (
		<div
			id='login'
			className='h-screen max-lg:grid max-lg:place-items-center'
		>
			{redirect}

			<div className='w-1/2 rounded bg-white p-3 max-lg:mx-auto max-lg:w-3/4 lg:grid lg:h-full lg:place-items-center'>
				<div className='w-1/2 max-lg:w-full'>
					<h2 className='text-xl font-medium text-base-color lg:text-2xl'>
						Linear Meetings
					</h2>
					<form
						onSubmit={handleSubmit}
						className='mt-4 w-full space-y-2'
					>
						<Username user={user} setUser={setUser} />
						<Password pw={pw} setPw={setPw} />
						{/* <div className='!mt-0 w-full text-right'>
							<a href='#' className='text-xs'>
								esqueceu a senha?
							</a>
						</div> */}
						{/* <div>
							<span className='text-red-500 text-xs'>Error</span>
						</div> */}
						<Submit />
					</form>
				</div>
			</div>
		</div>
	);
}

const Username = ({ user, setUser }) => {
	return (
		<label htmlFor='user' className='relative flex items-center'>
			<input
				type='text'
				id='user'
				placeholder='user'
				value={user}
				onChange={(e) => setUser(e.target.value)}
				className={`sm: peer w-full rounded border-2 border-black bg-slate-100 py-1 pl-6 pr-[18.5ch] !outline-0 placeholder:text-slate-300 valid:border-base-color focus:border-base-color sm:py-2 sm:pl-8 sm:pr-[19.1ch]`}
				required
				onInvalid={(e) =>
					e.target.classList.add("invalid:border-red-500")
				}
			/>
			<UserIcon
				className={`absolute left-1.5 aspect-square w-5 sm:left-2 ${
					user ? "text-base-color" : "text-black"
				} peer-focus:text-base-color`}
			/>
			<span
				className={`absolute right-1.5 text-xs sm:right-2.5 ${
					user ? "text-black" : "text-slate-300"
				}`}
			>
				@linear.net.br
			</span>
		</label>
	);
};

const Password = ({ pw, setPw }) => {
	const [eye, setEye] = useState(false);

	useEffect(() => {
		eye && setTimeout(() => setEye(false), 1500);
	}, [eye]);

	return (
		<label htmlFor='password' className='relative flex items-center'>
			<input
				type={eye ? "text" : "password"}
				id='password'
				placeholder='password'
				value={pw}
				onChange={(e) => setPw(e.target.value)}
				className={`peer w-full rounded border-2 border-black bg-slate-100 py-1 px-6 !outline-0 placeholder:text-slate-300 valid:border-base-color focus:border-base-color sm:py-2 sm:px-8`}
				required
				onInvalid={(e) =>
					e.target.classList.add("invalid:border-red-500")
				}
			/>
			<LockClosedIcon
				className={`absolute left-1.5 aspect-square w-5 sm:left-2 ${
					pw ? "text-base-color" : "text-black"
				} peer-focus:text-base-color`}
			/>
			{eye ? (
				<EyeIcon
					onClick={() => setEye(false)}
					className={`absolute right-1.5 aspect-square w-5 sm:right-2 ${
						pw ? "text-base-color" : "text-slate-300"
					} cursor-pointer peer-focus:text-black`}
				/>
			) : (
				<EyeSlashIcon
					onClick={() => setEye(true)}
					className={`absolute right-1.5 aspect-square w-5 sm:right-2 ${
						pw ? "text-black" : "text-slate-300"
					} cursor-pointer peer-focus:text-black`}
				/>
			)}
		</label>
	);
};

const Submit = () => {
	return (
		<button type='submit' className='btn-login-submit'>
			Entrar
		</button>
	);
};

// const AnonymousLogin = () => {
// 	return <button>Fazer agendamento</button>;
// };

export default Login;
