"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faScissors,
	faCalendar,
	faDollarSign,
	faSignOutAlt,
	faBars,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
	const [navOpen, setNavOpen] = useState<boolean>(false);

	const toggleNav = () => setNavOpen(!navOpen);

	return (
		<>
			<FontAwesomeIcon
				icon={!navOpen ? faBars : faXmark}
				className="text-white w-10 h-10 absolute top-4 left-4 cursor-pointer"
				onClick={toggleNav}
			/>

			<aside className="lg:bg-barberBlue lg:flex w-full mt-16 lg:w-fit lg:px-3 lg:h-screen flex-col justify-center fixed">
				<div
					className={`${
						navOpen ? "block" : "hidden"
					} lg:flex lg:flex-col gap-10 lg:items-start bg-barberBlue/90 w-full p-4 rounded-b-lg max-lg:space-y-6`}
				>
					<Link
						href={"/barberos"}
						className="flex hover:scale-110 transition duration-200 items-center w-full max-lg:justify-center"
					>
						<FontAwesomeIcon
							icon={faScissors}
							className="text-white w-10 h-10"
						/>
						{navOpen && (
							<span className="text-white ml-2 text-2xl font-bold uppercase lg:capitalize">
								Barberos
							</span>
						)}
					</Link>

					<Link
						href={"/turnos"}
						className="flex hover:scale-110 transition duration-200 items-center w-full max-lg:justify-center"
					>
						<FontAwesomeIcon
							icon={faCalendar}
							className="text-white w-10 h-10"
						/>
						{navOpen && (
							<span className="text-white ml-2 text-2xl font-bold uppercase lg:capitalize">Turnos</span>
						)}
					</Link>

					<Link
						href={"/ganancias"}
						className="flex hover:scale-110 transition duration-200 items-center w-full max-lg:justify-center"
					>
						<FontAwesomeIcon
							icon={faDollarSign}
							className="text-white w-10 h-10"
						/>
						{navOpen && (
							<span className="text-white ml-2 text-2xl font-bold uppercase lg:capitalize">
								Ganancias
							</span>
						)}
					</Link>

					<div className="flex items-center hover:scale-105 transition duration-200 cursor-pointer w-full max-lg:justify-center">
						<FontAwesomeIcon
							icon={faSignOutAlt}
							className="text-white w-8 h-8"
						/>
						{navOpen && (
							<span className="text-white ml-2 text-xl font-bold uppercase lg:capitalize">
								Cerrar sesión
							</span>
						)}
					</div>
				</div>
			</aside>
		</>
	);
}
