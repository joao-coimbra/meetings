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
			.then((res) => {
				console.log(res)
				setRedirect(<Navigate to='/' />)
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

			<div className='max-lg:w-3/4 w-1/2 lg:h-full p-3 bg-white rounded lg:grid lg:place-items-center max-lg:mx-auto'>
				<div className='max-lg:w-full w-1/2'>
					<h2 className='text-xl lg:text-2xl text-base-color font-medium'>
						Linear Meetings
					</h2>
					<form
						onSubmit={handleSubmit}
						className='w-full mt-4 space-y-2'
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
				className={`peer w-full !outline-0 border-2 border-black focus:border-base-color py-1 sm:py-2 pl-6 sm:pl-8 pr-[18.5ch] sm:pr-[19.1ch] sm: rounded placeholder:text-slate-300 bg-slate-100 valid:border-base-color`}
				required
				onInvalid={(e) =>
					e.target.classList.add("invalid:border-red-500")
				}
			/>
			<UserIcon
				className={`w-5 aspect-square absolute left-1.5 sm:left-2 ${
					user ? "text-base-color" : "text-black"
				} peer-focus:text-base-color`}
			/>
			<span
				className={`absolute right-1.5 sm:right-2.5 text-xs ${
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
				className={`peer w-full !outline-0 border-2 border-black focus:border-base-color py-1 sm:py-2 px-6 sm:px-8 rounded placeholder:text-slate-300 bg-slate-100 valid:border-base-color`}
				required
				onInvalid={(e) =>
					e.target.classList.add("invalid:border-red-500")
				}
			/>
			<LockClosedIcon
				className={`w-5 aspect-square absolute left-1.5 sm:left-2 ${
					pw ? "text-base-color" : "text-black"
				} peer-focus:text-base-color`}
			/>
			{eye ? (
				<EyeIcon
					onClick={() => setEye(false)}
					className={`w-5 aspect-square absolute right-1.5 sm:right-2 ${
						pw ? "text-base-color" : "text-slate-300"
					} peer-focus:text-black cursor-pointer`}
				/>
			) : (
				<EyeSlashIcon
					onClick={() => setEye(true)}
					className={`w-5 aspect-square absolute right-1.5 sm:right-2 ${
						pw ? "text-black" : "text-slate-300"
					} peer-focus:text-black cursor-pointer`}
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
