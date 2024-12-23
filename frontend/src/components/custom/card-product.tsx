import { Card, CardContent, CardHeader } from "../ui/card";
import { NavigateFunction } from "react-router";
import { cn, getImgUrl } from "@/lib/utils";
import { Star } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Product } from "@/entities/product.entity";

export function CardProduct({
	product,
	navigate,
	className,
}: {
	product: Product;
	navigate: NavigateFunction;
	className?: string;
}) {
	return (
		<Card
			className={cn("shadow-lg rounded-3xl p-5 relative pt-[210px] w-[240px]", className)}
			onClick={() => navigate("/" + product.id)}
		>
			<CardHeader className="flex flex-row justify-center">
				<img
					src={getImgUrl(product.img)}
					className="h-[300px]  object-contain drop-shadow-[0px_10px_9px_#cdcdcd] absolute top-[-120px]"
				/>
			</CardHeader>
			<CardContent>
				<h1 className="text-2xl capitalize">{product.name}</h1>
				<div className="flex gap-1.5  mb-4">
					{[...Array(5)].map((_, index) =>
						index < product.rating ? (
							<Star className="w-5 fill-orange-400 stroke-none" key={"star-" + index} />
						) : (
							<Star className="w-5 fill-zinc-300 stroke-none" key={"star-" + index} />
						)
					)}
				</div>
				<h1 className="text-xl font-bold">Rp. {product.price.toLocaleString("IND")}</h1>
			</CardContent>
		</Card>
	);
}

export function ListProduct() {
	return (
		<div className="flex gap-4 items-center">
			<div className="flex justify-center rounded-xl items-center w-[80px] h-[80px] p-1 ">
				<img src="./src/assets/images/drink-1.png" className="h-full object-contain" />
			</div>
			<div>
				<h1 className="text-lg font-medium mb-1">Red Velvet</h1>
				<p className="text-xs">Lorem ipsum dolor sit</p>
			</div>
			<h1 className="text-xl ms-auto">Rp 10.000</h1>
		</div>
	);
}

export function CardProductSkeleton() {
	return (
		<Skeleton className="w-[240px] shrink-0 h-full rounded-2xl bg-slate-200 p-5">
			<Skeleton className="bg-slate-300 w-[85%] h-5 mt-[70%]" />
			<Skeleton className="bg-slate-300 w-[80%] h-4 mt-3" />
			<Skeleton className="bg-slate-300 w-[50%] h-5 mt-8" />
		</Skeleton>
	);
}
