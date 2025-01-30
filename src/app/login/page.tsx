"use client";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!username || !password) {
            alert('Por favor, complete los campos');
            return;
        }

        const loginData = {
            username,
            password
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })

        if(response.ok) {
            alert('Inicio de sesión exitoso');
            return;
        } else {
            alert('Usuario o contraseña incorrectos');
            return;
        }
    }

	return (
		<div>
			<h1 className="text-center font-bold text-2xl mb-6">INICIAR SESIÓN</h1>

			<form className="w-full max-w-md mx-auto gap-4 flex-col space-y-4" onSubmit={handleSubmit}>
				<div className="flex flex-col">
					<label htmlFor="username" className="text-sm font-bold mb-1 text-center">
						Usuario
					</label>
					<input
						id="username"
						type="text"
						className="border bg-[#C8C8C8] p-2 rounded-lg"
                        placeholder="Usuario..."
                        required
                        onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="password"
						className="text-sm font-bold mb-1 text-center"
					>
						Contraseña
					</label>
					<input
						id="password"
						type="password"
						className="border bg-[#C8C8C8] p-2 rounded-lg"
                        placeholder="•••••••"
                        required
                        onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="flex justify-center w-full max-w-md">
					<button className="bg-barberBlue text-white p-2 rounded-lg mt-2 w-full max-w-md">
						Iniciar Sesión
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
