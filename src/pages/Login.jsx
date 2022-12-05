import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { api as auth } from "../services/api/auth.api";
import { LocalStorage } from "../services/cache/LocalStorage.service";

function Login() {

    const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId:
					"352760083090-rs7ttsjkkd0ja6svvdhn1auik66s27ue.apps.googleusercontent.com",
				scope: "email",
			});
		}

		gapi.load("client:auth2", start);
	}, []);

	const onSuccess = (res) => {
		console.log("Login SUCCESS");
		console.log(res.profileObj);

		auth.signin({
			id: res.profileObj.googleId,
			user: res.profileObj.email,
		}).then(res => {
			alert('Success')
            LocalStorage.set("token", res.data.token);
        }).catch(err => console.log(err));
        setRedirect(<Navigate to={"/success"} />)
	};

	const onLogoutSuccess = () => {
		alert("Logout success!");
        LocalStorage.remove("token");
	};

	const onFailure = (res) => {
		console.log(res);
	};

	return (
		<div id='login'>
            {redirect}
			<GoogleLogin
				clientId='352760083090-rs7ttsjkkd0ja6svvdhn1auik66s27ue.apps.googleusercontent.com'
				buttonText='Login with google'
				// render={renderProps => (
				//     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
				// )}
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={"single_host_origin"}
				isSignedIn={true}
			/>

			<GoogleLogout
				clientId='352760083090-rs7ttsjkkd0ja6svvdhn1auik66s27ue.apps.googleusercontent.com'
				buttonText='Logout'
				onLogoutSuccess={onLogoutSuccess}
			/>
		</div>
	);
}

export default Login;
