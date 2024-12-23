import { Minus, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/useCart";
import { cn, getImgUrl } from "@/lib/utils";
import { ProductOrder } from "@/entities/product-order.entity";

export function CartList({ product, isShow }: { product: ProductOrder; isShow: boolean }) {
	const { updateQty, updateSugar, updateCoffe, updateMilk, remove } = useCart();

	const getSubtotalPrice = () => {
		return product.price * product.qty;
	};

	return (
		<div>
			<div className="flex items-center h-[150px]">
				<img src={getImgUrl(product.img)} className="h-[50%] object-contain" />
				<div className="h-full flex flex-col justify-center flex-grow ms-7">
					<h1 className="text-xl capitalize">{product.name}</h1>
					<h1 className="text-xl font-bold mt-2">Rp {getSubtotalPrice().toLocaleString("IND")}</h1>
					<h1 className="text-xs mt-2 font-medium text-zinc-400">
						Rp {product.price.toLocaleString("IND")} x {product.qty}
					</h1>
				</div>
				<div className="h-full flex gap-3 items-center py-4 me-3">
					<Button
						variant={"outline"}
						className="p-[15px] w-0 h-0"
						onClick={() => updateQty(product.createdAt, product.qty - 1)}
					>
						<Minus style={{ width: 15 }} />
					</Button>
					<h1>{product.qty}</h1>
					<Button
						variant={"outline"}
						className="p-4 w-0 h-0"
						onClick={() => updateQty(product.createdAt, product.qty + 1)}
					>
						<Plus style={{ width: 15 }} />
					</Button>
				</div>
				<Button
					variant={"destructive"}
					className="w-0 h-0 p-4 rounded-full"
					onClick={() => remove(product.createdAt)}
				>
					<X />
				</Button>
			</div>
			<div className={cn(`grid grid-cols-3 gap-3 ${!isShow ? "hidden" : ""}`)}>
				<div>
					<p className="capitalize">gula ({product.sugar}%)</p>
					<input
						type="range"
						className="w-full"
						max={100 / 3}
						value={product.sugar}
						onChange={(e) => updateSugar(product.createdAt, parseInt(e.target.value))}
					/>
				</div>
				<div>
					<p className="capitalize">kopi ({product.coffe}%)</p>
					<input
						type="range"
						className="w-full"
						max={100 / 3}
						value={product.coffe}
						onChange={(e) => updateCoffe(product.createdAt, parseInt(e.target.value))}
					/>
				</div>
				<div>
					<p className="capitalize">susu ({product.milk}%)</p>
					<input
						type="range"
						className="w-full"
						max={100 / 3}
						value={product.milk}
						onChange={(e) => updateMilk(product.createdAt, parseInt(e.target.value))}
					/>
				</div>
			</div>
		</div>
	);
}
