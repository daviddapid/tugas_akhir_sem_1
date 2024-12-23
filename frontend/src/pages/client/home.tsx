import { CardProduct, CardProductSkeleton } from "@/components/custom/card-product";
import { Product } from "@/entities/product.entity";
import { getProducts } from "@/fetching/product";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

export default function HomePage() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState<Product[]>();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			setProducts(await getProducts());
			setLoading(false);
		})();
	}, []);

	return (
		<div className="min-h-screen">
			<header className=" px-[20px]">
				<div className="flex justify-between mt-8 items-center mb-5">
					<h1 className="text-3xl font-semibold">NgombeanKu</h1>
					<ShoppingBag />
				</div>
				{/* <Input placeholder="search..." className="py-5" /> */}
			</header>

			{loading ? (
				<div className="flex h-[300px] mt-[70px] justify-center gap-5">
					<CardProductSkeleton />
					<CardProductSkeleton />
					<CardProductSkeleton />
				</div>
			) : (
				// {/* </div> */}
				<Swiper
					spaceBetween={12}
					slidesPerView={"auto"}
					direction="horizontal"
					centeredSlides={true}
					loop={true}
					className="overflow-visible mt-[155px]"
				>
					{products?.map((p) => (
						<SwiperSlide className="w-fit" key={p.id}>
							<CardProduct product={p} navigate={navigate} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
}
