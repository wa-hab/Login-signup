import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			navigate("/change_username");
		}
	}, []);

	const submitForm = (e) => {
		e.preventDefault();

		fetch("http://localhost:3000/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		}).then((response) => {
			response.json().then((jsonResponse) => {
				if (jsonResponse?.success === "ok") {
					localStorage.setItem("token", jsonResponse.token);
					localStorage.setItem("username", username);

					window.alert(jsonResponse.message);
					navigate("/change_username");
				} else if (jsonResponse?.success === "no") {
					window.alert(jsonResponse.message);
				}
			});
		});
	};

	return (
		<div className="bg-slate-900 text-neutral-300 h-screen flex justify-center items-center text-5xl flex-col">
			<Link to="/">
				<div className="text-xl border-2 bg-neutral-300 hover:bg-slate-900 text-slate-900 hover:text-neutral-300 border-neutral-300 p-4 duration-150 rounded-md rounded-b-none border-b-none">
					Homepage
				</div>
			</Link>
			<div className="bg-neutral-300 text-slate-900 text-xl flex flex-col items-center justify-center p-5 rounded-md">
				<p className="text-5xl p-5">Login</p>
				<form onSubmit={submitForm}>
					<div className="flex">
						<label
							className="border border-slate-900 rounded-md rounded-r-none border-r-0 p-2 m-2 pr-0 mr-0"
							htmlFor="username"
						>
							<p className="px-2">Username</p>
						</label>
						<input
							className="border border-slate-900 rounded-md p-2 m-2 pl-0 ml-0 rounded-l-none border-l-0"
							type="username"
							name="username"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="flex">
						<label
							className="border border-slate-900 rounded-md rounded-r-none border-r-0 p-2 m-2 pr-0 mr-0"
							htmlFor="password"
						>
							<p className="px-2">Password</p>
						</label>
						<input
							className="border border-slate-900 rounded-md p-2 m-2 pl-0 ml-0 rounded-l-none border-l-0"
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="flex items-center justify-center">
						<button
							className="bg-slate-800 text-neutral-300 p-4 rounded-md hover:scale-105 cursor-pointer duration-150"
							type="submit"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
