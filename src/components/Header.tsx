import Image from "next/image";

export default function Header() {
	return (
		<header className="bg-barberBlue w-full h-16 fixed flex justify-end">
			<Image
				src="/logobarber.jpeg"
				alt="Logo Barber"
				width={60}
				height={30}
				className="rounded-full p-2"
			/>
		</header>
	);
}
