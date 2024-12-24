import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";

export function CartLink({ className }: { className?: string }) {
	return (
		<Link to={"/cart"}>
			<ShoppingBag className={className} />
		</Link>
	);
}
