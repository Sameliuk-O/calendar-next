import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: any;
}

export const ModalBlock: React.FC<ModalProps> = ({ isOpen, onClose, title,  children }) => {
	const modalClasses = isOpen ? 'fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10' : 'hidden';

	return (
		<div className={modalClasses}>
			<div className="bg-white p-8 rounded shadow-lg w-[70%]">
				<div className="mb-4 flex justify-between items-center">
					<h2 className="text-xl font-bold">{title}</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
						&#10006;
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};
