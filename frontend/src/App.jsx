import { Link } from "react-router-dom";


const Button = ({ link, innerText }) => {
	return (
		<div className="m-4 p-2">
			<Link to={link}>
				<button className="bg-slate-300 text-slate-900 p-4 rounded-md hover:scale-105 cursor-pointer duration-150">
					{innerText}
				</button>
			</Link>
		</div>
	);
};

const App = () => {
	return (
		<div className="bg-slate-900 text-neutral-300 h-screen flex justify-center items-center text-5xl">
			<Button link="/login" innerText="Login" />
			/
			<Button link="/signup" innerText="Signup" />
		</div>
	);
};


export default App;
