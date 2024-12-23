import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, InputPassword } from "@/components/ui/input";
import { config } from "@/lib/config";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

type LoginDTO = {
	username: string;
	password: string;
};

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginDTO>();
	const navigate = useNavigate();

	const onValidHandler: SubmitHandler<LoginDTO> = async (data) => {
		const res = await fetch(config.baseUrl + "/login", {
			method: "POST",
			body: JSON.stringify(data),
		});
		const json = await res.json();
		if (res.ok) {
			sessionStorage.setItem("secretKey", json.secretKey);
			return navigate("/cashier");
		}
		Swal.fire({
			icon: "error",
			title: "Gagal Login",
			text: json.message,
		});
	};

	return (
		<div className="min-h-screen flex justify-center items-center">
			<Card className="w-[450px] px-5 py-7 rounded-2xl shadow-lg">
				<CardHeader>
					<CardTitle className="text-center text-3xl">Login</CardTitle>
				</CardHeader>
				<CardContent className="my-10 flex flex-col gap-3">
					<div>
						<Input placeholder="username" {...register("username", { required: "field tidak boleh kosong" })} />
						<small className="text-red-500">{errors.username?.message}</small>
					</div>
					<div>
						<InputPassword
							placeholder="password"
							{...register("password", { required: "field tidak boleh kosong" })}
						/>
						<small className="text-red-500">{errors.password?.message}</small>
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full" onClick={handleSubmit(onValidHandler, (errors) => console.log(errors))}>
						Login
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
