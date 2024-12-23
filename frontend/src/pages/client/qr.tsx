import { QRCodeSVG } from "qrcode.react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getImgUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ProductOrder } from "@/entities/product-order.entity";
import { getOrderById } from "@/fetching/order-fetch";
import { Order } from "@/entities/order.entity";

export default function QrPage() {
	const [order, setOrder] = useState<Order>();
	const orderId = sessionStorage.getItem("orderId");

	if (orderId == null) {
		return (
			<div className="bg-blue-500 min-h-screen px-5 pt-5 pb-[150px]">
				<div className="p-5 rounded-2xl w-full border border-blue-500 bg-blue-100">
					<h1 className="capitalize text-xl font-semibold text-blue-700">anda tidak memiliki order</h1>
					<p className="text-lg mt-4 text-blue-700">
						silahkan memilih pesanan terlebih dahulu di halaman "home", lalu melakukan order
					</p>
				</div>
			</div>
		);
	}

	useEffect(() => {
		(async () => {
			setOrder(await getOrderById(orderId!));
		})();
	}, []);

	return (
		<div className="bg-blue-500 min-h-screen px-5 pt-5 pb-[150px]">
			<div className="bg-white  py-5 rounded-2xl">
				<h1 className="capitalize text-2xl text-center mb-3">Tunjukkan QR ini ke kasir</h1>
				<QRCodeSVG value={order?.id!} size={300} className="mx-auto" />

				<div className="flex px-4 gap-5 font-bold mt-6 mb-8 justify-center">
					<h1 className=" text-lg ">Nama Pemesan :</h1>
					<h1 className=" text-lg ">{order?.name}</h1>
				</div>
				<OrderDetail products={order?.products} />
			</div>
		</div>
	);
}

function OrderDetail({ products }: { products?: ProductOrder[] }) {
	const total = products?.reduce((total, p) => total + p.price * p.qty, 0);
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Img</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>price</TableHead>
						<TableHead>qty</TableHead>
						<TableHead>subtotal</TableHead>
						<TableHead>Sugar</TableHead>
						<TableHead>Coffe</TableHead>
						<TableHead>Milk</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products?.map((p, idx) => (
						<>
							<TableRow key={idx}>
								<TableCell>
									<img src={getImgUrl(p.img)} className="h-[50px]" />
								</TableCell>
								<TableCell>{p.name}</TableCell>

								<TableCell className="whitespace-nowrap">Rp {p.price.toLocaleString("IND")}</TableCell>
								<TableCell>{p.qty}</TableCell>
								<TableCell className="whitespace-nowrap">
									Rp {(p.price * p.qty).toLocaleString("IND")}
								</TableCell>
								<TableCell>
									<div className="bg-blue-100 text-blue-500 px-2 text-center rounded-full border border-blue-500">
										{p.sugar}%
									</div>
								</TableCell>
								<TableCell>
									<div className="bg-blue-100 text-blue-500 px-2 text-center rounded-full border border-blue-500">
										{p.coffe}%
									</div>
								</TableCell>
								<TableCell>
									<div className="bg-blue-100 text-blue-500 px-2 text-center rounded-full border border-blue-500">
										{p.milk}%
									</div>
								</TableCell>
							</TableRow>
						</>
					))}
				</TableBody>
			</Table>
			<div className="flex text-xl justify-between px-4 mt-5">
				<h1>Total Harga</h1>
				<h1 className="font-bold">Rp {total?.toLocaleString("IND")}</h1>
			</div>
		</>
	);
}
