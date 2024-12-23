import { NavLink, Outlet } from "react-router";
import { House, QrCode, ShoppingBag } from "lucide-react";

export default function ClientLayout() {
	return (
		<div>
			<main className="overflow-hidden">
				<Outlet />
			</main>
			<nav className="z-30 fixed bottom-[15px] w-[90vw] mx-auto rounded-full left-0 right-0 px-5 bg-white py-3 shadow-[0_0_9px_#afafafa6]">
				<div className="flex w-full justify-between px-8">
					<NavLink to={"/"} className="flex flex-col justify-center items-center">
						<House className="w-5 text-gray-500" />
						<p className="text-gray-500">Home</p>
					</NavLink>
					<NavLink to={"/cart"} className="flex flex-col justify-center items-center">
						<ShoppingBag className="w-5 text-gray-500" />
						<p className="text-gray-500">Cart</p>
					</NavLink>
					<NavLink to={"/qr"} className="flex flex-col justify-center items-center">
						<QrCode className="w-5 text-gray-500" />
						<p className="text-gray-500">My Qr</p>
					</NavLink>
				</div>
			</nav>
		</div>
	);
}
