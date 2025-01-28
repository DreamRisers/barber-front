"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faScissors,
	faCalendar,
	faDollarSign,
	faSignOutAlt,
	faBars,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

export default function Sidebar() {
	return (
		<aside className="hidden lg:flex bg-barberBlue lg:w-16 lg:h-screen flex-col items-center justify-center gap-10 fixed">
			<FontAwesomeIcon
				icon={faBars}
				className="text-white cursor-pointer w-10 h-10 p-4 absolute top-0"
			/>

			<Link href={"/barbers"} className="text-white">
				<FontAwesomeIcon
					icon={faScissors}
					className="text-white cursor-pointer w-10 h-10"
				/>
			</Link>

			<Link href={"/appointments"}>
				<FontAwesomeIcon
					icon={faCalendar}
					className="text-white cursor-pointer w-10 h-10"
				/>
			</Link>

			<Link href={"/gains"}>
				<FontAwesomeIcon
					icon={faDollarSign}
					className="text-white cursor-pointer w-10 h-10"
				/>
			</Link>

			<FontAwesomeIcon
				icon={faSignOutAlt}
				className="text-white cursor-pointer w-10 h-10 absolute bottom-4"
			/>
		</aside>
	);
}
