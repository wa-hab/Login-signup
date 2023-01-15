import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangeUserName = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState(localStorage.getItem("username"));
	const [newUsername, setNewUsername] = useState("");

	const changeUsername = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:3000/api/changeUsername", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify({
				newUsername: newUsername,
			}),
		});

        if(response.status === 200){
            setUsername(newUsername);
            localStorage.setItem("username", newUsername)
            alert("Successfully updated username");
        } else {
            alert("Something went wrong, please try again.");
        }
	};

	return (
		<div className="bg-slate-900 text-neutral-300 h-screen flex flex-col justify-center items-center text-5xl">
			<div className="text-xl hover:bg-neutral-300 hover:text-slate-900 p-4 duration-150 rounded-md">
				<button
					onClick={() => {
						localStorage.removeItem("token");
						navigate("/login");
					}}
				>
					Logout
				</button>
			</div>

			<div className="bg-neutral-300 text-slate-900 text-xl flex flex-col items-center justify-center p-5 rounded-md">
				<p className="text-3xl p-5">
					Hello {username}, enter your new username below
				</p>

				<form onSubmit={changeUsername} className="flex flex-col">
					<input
						type="text"
						className="p-2 border-2 border-slate-900 rounded-md "
						value={newUsername}
						onChange={(e) => {
							setNewUsername(e.target.value);
						}}
					/>
					<button
						type="submit"
						className="my-2 p-2 bg-slate-900 text-neutral-300 rounded-md w-1/2 self-center hover:scale-105 duration-150"
					>
						Confirm
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChangeUserName;
