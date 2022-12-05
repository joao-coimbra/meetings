import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL_API + "/auth";

export const api = {
	signin(id, user) {
		return axios.post(API_URL + "/login-google", { id, user });
	},
	logout() {
		// LocalStorage.remove("token");
	},
	verify() {
		return axios.get(`${API_URL}/verify-google`);
	},
};
