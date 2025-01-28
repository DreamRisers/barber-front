"use client";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="py-2 mx-4">
			<p className="my-2 text-center lg:text-right">
				Sitio web desarrollado por <Link href="https://www.dreamrisers.com" target="_blank" className="text-barberBlue hover:animate-pulse transition duration-300">DreamRisers</Link>
			</p>
		</footer>
	);
}
