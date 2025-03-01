import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

type ToDo = {
	activity: string;
	price: number;
	type: string;
	booking: boolean;
	accessibility: number;
};

const TODOLIST_KEY = "todoList";

export default function Home() {
	const { register, handleSubmit, reset } = useForm<ToDo>();

	const [todos, setTodo] = useState<ToDo[]>([]);

	const onSubmit = (data: ToDo) => {
		setTodo([...todos, data]);
		reset();
	};

	const deleteTodo = (index: number) => {
		setTodo(todos.filter((_, i) => i !== index));
	};

	function fetchTodos(): ToDo[] {
		if (typeof window !== "undefined") {
			const todos = localStorage.getItem(TODOLIST_KEY);
			return todos ? JSON.parse(todos) : [];
		}
		
		return [];
	}

	useEffect(() => {
		setTodo(fetchTodos);
	}, [])

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem(TODOLIST_KEY, JSON.stringify(todos));
		}
	}, [todos]);

	return (
		<div
			className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
		>
			<main className="flex gap-8 row-start-2 items-center sm:items-start">
				<div className="form">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-2"
					>
						<div className="input-group">
							<p>Activity</p>
							<div className="input-field">
								<input type="text" {...register("activity")} />
							</div>
						</div>
						<div className="input-group">
							<p>Price</p>
							<div className="input-field">
								<input type="number" {...register("price")} />
							</div>
						</div>
						<div className="input-group">
							<p>Type</p>
							<div className="input-field">
								<select {...register("type")}>
									<option value="Education">Education</option>
									<option value="Recretional">
										Recretional
									</option>
									<option value="Social">Social</option>
									<option value="DIY">DIY</option>
									<option value="Charity">Charity</option>
									<option value="Cooking">Cooking</option>
									<option value="Relaxation">
										Relaxation
									</option>
									<option value="Music">Music</option>
									<option value="Busywork">Busywork</option>
								</select>
							</div>
						</div>
						<div className="input-group">
							<p>Booking required</p>
							<div className="ml-auto">
								<input
									type="checkbox"
									{...register("booking")}
								/>
							</div>
						</div>
						<div className="input-group">
							<p>Accessibility</p>
							<div className="ml-auto">
								<input
									type="range"
									min={0.0}
									max={1.0}
									step={0.1}
									{...register("accessibility")}
								/>
							</div>
						</div>

						<button
							type="submit"
							className="border border-black bg-black text-white cursor-pointer"
						>
							Submit
						</button>
					</form>
				</div>

				<div>
					<h1 className="text-2xl">Todo List ({todos.length})</h1>
					<div className="flex gap-2 flex-wrap">
						{todos.map((todo, index) => (
							<div key={index} className="todo-container">
								<div>Activity: {todo.activity}</div>
								<div>Price: {todo.price}</div>
								<div>Type : {todo.type}</div>
								<div>
									Booking Required:{" "}
									{todo.booking ? "Yes" : "No"}
								</div>
								<div>Accessibility: {todo.accessibility}</div>
								<button
									className="delete"
									onClick={() => deleteTodo(index)}
								>
									x
								</button>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
