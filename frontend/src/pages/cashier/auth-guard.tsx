import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
	const secretKey = sessionStorage.getItem("secretKey");

	if (secretKey != null && secretKey == "ikan-hiu-makan-tomat") {
		return <Outlet />;
	}

	return <Navigate to={"/login"} />;
}
