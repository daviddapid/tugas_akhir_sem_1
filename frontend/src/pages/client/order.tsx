import { Button } from "@/components/ui/button";
import { ProductOrder } from "@/entities/product-order.entity";
import { Product } from "@/entities/product.entity";
import { getSingleProduct } from "@/fetching/product";
import { useCart } from "@/hooks/useCart";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function OrderPage() {
	const { id } = useParams();
	const [product, setProduct] = useState<Product>();

	useEffect(() => {
		(async () => {
			setProduct(await getSingleProduct(parseInt(id!)));
		})();
	}, []);

	// ==============
	//    UI Logic
	// ==============
	const [milkHeight, setMilkHeight] = useState(30);
	const [sugarHeight, setSugarHeight] = useState(30);
	const [coffeeHeight, setCoffeeHeight] = useState(30);

	const [qty, setQty] = useState(1);
	const price = product?.price! * qty;

	const sugarY = 255 - sugarHeight;
	const coffeeY = sugarY - coffeeHeight;
	const milkY = coffeeY - milkHeight;

	const maxHeigtCup = 176;
	const maxRangeIngredients = maxHeigtCup / 3;

	const sugarPercentage = Math.round((sugarHeight / maxHeigtCup) * 100);
	const coffeePercentage = Math.round((coffeeHeight / maxHeigtCup) * 100);
	const milkPercentage = Math.round((milkHeight / maxHeigtCup) * 100);

	// ==================
	//    Business Logic
	// ==================
	const { add } = useCart();

	const addQty = () => {
		setQty((oldState) => oldState + 1);
	};
	const minQty = () => {
		if (qty - 1 > 0) {
			setQty((oldState) => oldState - 1);
		}
	};

	const handleOrder = () => {
		const productOrder: ProductOrder = {
			id: product!.id,
			img: product!.img,
			name: product!.name,
			price: product!.price,
			qty,
			sugar: Math.round((sugarHeight / maxHeigtCup) * 100),
			coffe: Math.round((coffeeHeight / maxHeigtCup) * 100),
			milk: Math.round((milkHeight / maxHeigtCup) * 100),
			createdAt: Date.now(),
		};
		add(productOrder);
	};

	return (
		<div className="flex flex-col min-h-screen bg-blue-500">
			<div className="flex justify-between items-center mt-10 px-5">
				<Link to={"/" + id}>
					<ArrowLeft className="text-white" />
				</Link>
				<h1 className="text-xl text-white leading-none">{product?.name}</h1>
				<ShoppingBag className="text-white" />
			</div>
			<div className="flex justify-center mt-9">
				<div className="rounded-full bg-white w-[250px] h-[250px] flex justify-center items-center">
					<svg
						className="w-[115px]"
						width="162"
						height="255"
						viewBox="0 0 162 255"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M161 51H1V75H161V51Z" stroke="black" strokeWidth="1.5" />
						<path
							d="M13 51V51C13 23.3858 35.3858 1 63 1H99C126.614 1 149 23.3858 149 51V51"
							stroke="black"
							strokeWidth="1.5"
						/>
						<path
							d="M13 75.25H12.1974L12.2517 76.0507L22.9875 234.404C23.7258 245.294 32.7748 253.75 43.69 253.75H117.415C128.285 253.75 137.313 245.361 138.109 234.52L149.748 76.0549L149.807 75.25H149H13Z"
							stroke="black"
							strokeWidth="1.5"
						/>
						<mask
							id="mask0_2118_1021"
							// style="mask-type:alpha"
							maskUnits="userSpaceOnUse"
							x="13"
							y="76"
							width="136"
							height="177"
						>
							<path
								d="M24.2346 234.319L13.535 76.5H148.462L136.863 234.428C136.114 244.616 127.63 252.5 117.415 252.5H43.69C33.4324 252.5 24.9285 244.553 24.2346 234.319Z"
								fill="#D9D9D9"
								stroke="black"
							/>
						</mask>
						<g mask="url(#mask0_2118_1021)">
							<rect x="-24.5" y="76.5" width="212" height="176" stroke="black" />
							<rect x="-25" y={milkY} width="213" height={milkHeight} fill="#c98f4f" id="milk" />
							<rect x="-25" y={coffeeY} width="213" height={coffeeHeight} fill="#6C4E31" id="coffe" />
							<rect x="-25" y={sugarY} width="213" height={sugarHeight} fill="#F8F0EB" id="sugar" />
						</g>
					</svg>
				</div>
			</div>

			<div className="flex flex-col bg-white flex-grow mt-8 px-5 gap-4 rounded-t-2xl pt-7 pb-5">
				{/* ingredients */}
				<h1 className="text-xl font-semibold">Ingredients</h1>
				<div className="mb-5 flex flex-col gap-4">
					<div className="w-full flex items-center gap-3">
						<label>Susu:</label>
						<input
							className="flex-grow"
							type="range"
							min="0"
							max={maxRangeIngredients}
							value={milkHeight}
							onChange={(e) => setMilkHeight(parseInt(e.target.value))}
						/>
						<p>{milkPercentage}%</p>
					</div>
					<div className="w-full flex items-center gap-3">
						<label>Kopi:</label>
						<input
							className="flex-grow"
							type="range"
							min="0"
							max={maxRangeIngredients}
							value={coffeeHeight}
							onChange={(e) => setCoffeeHeight(parseInt(e.target.value))}
						/>
						<p>{coffeePercentage}%</p>
					</div>
					<div className="w-full flex items-center gap-3">
						<label>Gula:</label>
						<input
							className="flex-grow"
							type="range"
							min="0"
							max={maxRangeIngredients}
							value={sugarHeight}
							onChange={(e) => setSugarHeight(parseInt(e.target.value))}
						/>
						<p>{sugarPercentage}%</p>
					</div>
				</div>
				<div className="flex justify-between items-center mb-7">
					{/* quantity */}
					<div className="flex items-center gap-5">
						<Button className="shadow-md" variant={"outline"} size={"icon"} onClick={minQty}>
							<Minus />
						</Button>
						<h1 className="text-xl font-semibold">{qty}</h1>
						<Button className="shadow-md" variant={"outline"} size={"icon"} onClick={addQty}>
							<Plus />
						</Button>
					</div>
					{/* price */}
					<h1 className="text-3xl font-semibold">Rp {price.toLocaleString("IND")}</h1>
				</div>
				<Link to={"/cart"}>
					<Button className="w-full" onClick={handleOrder}>
						order
					</Button>
				</Link>
			</div>
		</div>
	);
}
