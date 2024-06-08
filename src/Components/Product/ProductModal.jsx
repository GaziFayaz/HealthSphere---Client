const ProductModal = ({ modalId, modalData }) => {
	return (
		<dialog id={modalId} className="modal">
			<div className="modal-box w-11/12 max-w-3xl text-left lg:py-20 lg:px-16">
				<h1 className="font-slab">
					<span className="font-bold text-3xl ">{modalData.medicine_name}</span>{" "}
					<span className="text-sm ml-2">{modalData.strength}</span>
				</h1>
				<p className="pt-3">{modalData.category_name}</p>
				<p className="pt-3 text-theme text-md">{modalData.generic_name}</p>
				<p className="pt-2">
					<span className="font-bold">Manufacturer:</span>{" "}
					{modalData.manufacturer_name}
				</p>
				<h3 className="pt-3 text-2xl font-bold">
					Price: <span className="text-3xl font-medium">Tk {modalData.unit_prices[0].price}</span> <span className="text-lg font-medium">/{modalData.unit_prices[0].unit}</span>
				</h3>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
};

export default ProductModal;
