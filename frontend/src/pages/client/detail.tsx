import { Button } from "@/components/ui/button";
import { Product } from "@/entities/product.entity";
import { getSingleProduct } from "@/fetching/product";
import { getImgUrl } from "@/lib/utils";
import { ArrowLeft, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function DetailPage() {
	const { id } = useParams();
	const [product, setProduct] = useState<Product>();

	useEffect(() => {
		(async () => {
			setProduct(await getSingleProduct(parseInt(id!)));
		})();
	}, []);

	return (
		<div className="flex flex-col min-h-screen bg-blue-500">
			<div className="flex justify-between mt-10 px-5 items-center">
				<Link to={"/"}>
					<ArrowLeft className="text-white" />
				</Link>
				<ShoppingBag className="text-white" />
			</div>
			<div className="grid grid-cols-3">
				<div className="text-white mt-12 px-5 col-span-2">
					<h1 className="text-4xl font-semibold">{product?.name}</h1>
					{/* <p>{product?.subTitle}</p> */}
					<div className="flex gap-2.5 mt-3">
						{[...Array(5)].map((_, index) =>
							index < product?.rating! ? (
								<Star className="fill-orange-400 stroke-orange-200" key={index} />
							) : (
								<Star className="fill-zinc-300 stroke-zinc-50" key={index} />
							)
						)}
					</div>
					<h1 className="text-4xl mt-10">Rp {product?.price.toLocaleString("IND")}</h1>
				</div>
			</div>

			<div className="bg-white flex-grow px-5 rounded-t-2xl py-5 mt-7 relative ">
				<img
					src={getImgUrl(product?.img!)}
					className="h-[270px] object-contain absolute top-[-245px] right-4 drop-shadow-lg"
				/>
				<h1 className="text-2xl mb-3 font-medium">Deskripsi</h1>
				<p className="text-slate-500">{product?.desc}</p>
			</div>
			<div className="fixed bottom-[20px] left-0 right-0 px-5">
				<Link to={"/order/" + id}>
					<Button className="w-full mt-8 ">Order</Button>
				</Link>
			</div>
		</div>
	);
}
