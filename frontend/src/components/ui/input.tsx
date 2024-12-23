import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

const InputPassword = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => {
		const [show, setShow] = React.useState(false);
		return (
			<div className="relative flex justify-end items-center">
				<input
					type={show ? "text" : "password"}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-background ps-3 pe-10 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						className
					)}
					ref={ref}
					{...props}
				/>
				{show ? (
					<Eye className="absolute mr-3" size={18} onClick={() => setShow(false)} />
				) : (
					<EyeOff className="absolute mr-3" size={18} onClick={() => setShow(true)} />
				)}
			</div>
		);
	}
);
Input.displayName = "InputPassword";

export { Input, InputPassword };
