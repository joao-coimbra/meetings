import { GoogleLogin, GoogleLogout } from "react-google-login";

const Success = () => {
    return (
        <div>Success

            <GoogleLogin
				clientId='352760083090-rs7ttsjkkd0ja6svvdhn1auik66s27ue.apps.googleusercontent.com'
				buttonText='Login with google'
				// render={renderProps => (
				//     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
				// )}
				onSuccess={res => console.log(res)}
                // className="!hidden"
				onFailure={res => console.log(res)}
				cookiePolicy={"single_host_origin"}
				isSignedIn={true}
			/>

            <GoogleLogout
				clientId='352760083090-rs7ttsjkkd0ja6svvdhn1auik66s27ue.apps.googleusercontent.com'
				buttonText='Logout'
				onLogoutSuccess={() => alert('sucess')}
			/>  
        </div>
    )
}

export default Success;