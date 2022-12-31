export const AUTH_TOKEN_KEY = 'authToken';

export interface LoginCredentials {
	email: string;
	password: string;
}

export async function createSessionToken(credentials: LoginCredentials) {
	const myHeaders = new Headers({
		'Content-Type': 'application/json'
	});
	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(credentials)
	};

	const request = await fetch(
		'https://l3le6qdmsf.execute-api.us-east-1.amazonaws.com/production/login',
		requestOptions
	);
	const response = await request.json();

	return response.token;
}

export function storeSessionToken(token: string) {
	localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function destroySessionToken() {
	localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getSessionToken() {
	localStorage.getItem(AUTH_TOKEN_KEY);
}

export function loginRedirect() {
	const redirect = new URLSearchParams(window.location.search).get('redirect');
	window.location.href = redirect ? redirect : '/admin';
}

export async function login(credentials: LoginCredentials) {
	const token = await createSessionToken(credentials);
	storeSessionToken(token);
	loginRedirect();
}
