import axios from "axios";

const API_URL = "http://localhost:8080/api" + "/auth";

export const api = {
	signin(id, user) {
		return axios.post(API_URL + "/signin", { id, user });
	}
};