import React from "react";
import Link from "next/link";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const StoreModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded shadow-lg w-1/3">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">{title}</h2>
					<button onClick={onClose} className="text-black font-bold">
						&times;
					</button>
				</div>
				<div>{children}</div>
				<div className="mt-4 flex justify-between">
					<Link href={"/store_login"}>
                    <button
						onClick={onClose}
						className="bg-amber-400 text-white py-2 px-4 rounded hover:bg-amber-500 mx-auto"
					>
						Log in
					</button>
                    </Link>
                    
                    <Link href={"/"}>
                    <button
						
						className="bg-amber-400 text-white py-2 px-4 rounded hover:bg-amber-500 mx-auto"
					>
						Home
					</button>
                    </Link>
                    
				</div>
			</div>
		</div>
	);
};

export default StoreModal;
