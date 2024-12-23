import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TableBody, Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Order } from "@/entities/order.entity";
import { getOrderById } from "@/fetching/order-fetch";
import { getImgUrl } from "@/lib/utils";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

export default function ScanPage() {
	const [order, setOrder] = useState<Order>();
	const [cash, setCash] = useState(0);
	const totalPrice = order?.products.reduce((total, p) => total + p.price * p.qty, 0) ?? 0;
	const kembalian = cash - totalPrice;

	const handleScan: (detectedCodes: IDetectedBarcode[]) => void = async (result) => {
		const order = await getOrderById(result[0].rawValue);
		setOrder(order);
	};

	const handleConfirm = () => {
		if (cash < totalPrice) {
			Swal.fire({
				icon: "error",
				title: "Transaksi Gagal",
				toast: true,
				text: "pastikan nominal pembayaran telah sesuai",
				position: "top-right",
				showConfirmButton: false,
				timer: 1500,
				iconColor: "white",
				customClass: {
					popup: "colored-toast",
				},
			});
		} else {
			setOrder(undefined);
			setCash(0);
			Swal.fire({
				icon: "success",
				title: "Transaksi Sukses",
				toast: true,
				position: "top-right",
				showConfirmButton: false,
				timer: 1500,
				iconColor: "white",
				customClass: {
					popup: "colored-toast",
				},
			});
		}
	};

	return (
		<div className="grid grid-cols-12 min-h-screen">
			<div className="col-span-9 py-10 px-7">
				<h1 className="text-3xl capitalize">shopping cart</h1>
				<Card className="mt-5">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>#</TableHead>
								<TableHead>img</TableHead>
								<TableHead>name</TableHead>
								<TableHead>sugar</TableHead>
								<TableHead>coffe</TableHead>
								<TableHead>milk</TableHead>
								<TableHead>price</TableHead>
								<TableHead>qty</TableHead>
								<TableHead>subtotal</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{order?.products.map((p, idx) => (
								<TableRow key={idx}>
									<TableCell>{idx + 1}</TableCell>
									<TableCell>
										<img src={getImgUrl(p.img)} className="h-[80px]" />
									</TableCell>
									<TableCell>{p.name}</TableCell>
									<TableCell>{p.sugar} %</TableCell>
									<TableCell>{p.coffe} %</TableCell>
									<TableCell>{p.milk} %</TableCell>
									<TableCell>Rp {p.price.toLocaleString("IND")}</TableCell>
									<TableCell>{p.qty}</TableCell>
									<TableCell>Rp. {(p.qty * p.price).toLocaleString("IND")}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Card>
			</div>
			<div className="col-span-3 bg-blue-500 px-5 py-8 rounded-xl h-[95%] my-auto me-5">
				<div className="w-[70%] mx-auto mb-10">
					<Scanner
						onScan={handleScan}
						styles={{ container: { width: "100%" } }}
						paused={false}
						allowMultiple={true}
					/>
				</div>
				<div className="flex justify-between items-center text-white">
					<h1 className="text-xl whitespace-nowrap">Total Price</h1>
					<h1 className="font-medium text-2xl text-end whitespace-nowrap">
						Rp {totalPrice.toLocaleString("IND")}
					</h1>
				</div>
				<div className="flex justify-between items-center text-white gap-5">
					<h1 className="text-xl text-end whitespace-nowrap">Cash</h1>
					<CurrencyInput
						id="input-example"
						name="input-name"
						placeholder="Please enter a number"
						// defaultValue={cash}
						value={cash}
						className="bg-transparent text-end text-2xl flex-grow font-medium w-full"
						decimalsLimit={2}
						prefix="Rp "
						decimalSeparator=","
						groupSeparator="."
						onValueChange={(value) => setCash(parseInt(value ?? "0"))}
					/>
				</div>
				<hr className="my-5" />
				<div className="flex justify-between text-2xl text-white">
					<h1>Kembalian</h1>
					<h1 className="font-medium">Rp {kembalian.toLocaleString("IND")}</h1>
				</div>
				<Button className="w-full mt-7 " variant={"outline"} onClick={handleConfirm}>
					Confirm
				</Button>
			</div>
		</div>
	);
}
