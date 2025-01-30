"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useUserLogged = () => {
	const router = useRouter();
	const [userLogged, setUserLogged] = useState<string | undefined>();

	useEffect(() => {
		const userCookie = Cookies.get("user");
		const currentPath = window.location.pathname;

		setUserLogged(userCookie);

		if (userCookie && currentPath === "/login") {
			router.push("/");
		} else if (!userCookie && currentPath !== "/login") {
			router.push("/login");
		}
	}, [router]);

	return userLogged;
};
