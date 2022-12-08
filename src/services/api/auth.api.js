import axios from "axios";
import { LocalStorage } from "../cache/LocalStorage.service";

const API_URL = process.env.REACT_APP_BASE_URL_API + "/auth";

export const api = {
	signin(username, password) {
		username = username+'@linearequipamentos.com.br'
		return axios.post(API_URL + "/m-login", { username, password });
	},
	logout() {
		// LocalStorage.remove("token");
	},
	verify() {
		return axios.get(`${API_URL}/m-verify`, {
			headers: {
				token: LocalStorage.get("m-token"),
			},
		});
	},
};
