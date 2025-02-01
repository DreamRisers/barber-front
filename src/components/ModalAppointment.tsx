import { createAppointment, getAppointmentById } from "@/helpers/appointments";
import { IModalProps, INewAppointment } from "@/interfaces/types";
import { useEffect, useState } from "react";

export default function ModalAppointment({
	isOpen,
	UUID,
	onClose,
}: IModalProps) {
	const [formData, setFormData] = useState<INewAppointment>();

	const closeModal = () => {
		onClose();
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData(
			(prevData) =>
				({
					...prevData,
					[e.target.name]:
						e.target.type === "number"
							? Number(e.target.value) || 0
							: e.target.value,
				} as INewAppointment)
		);
	};

	const handleSubmit = async () => {
		if (!formData) return;
		try {
			await createAppointment(formData);
			alert("Turno creado con éxito");
			closeModal();
		} catch (error) {
			console.error("Error al crear el turno:", error);
			alert("Hubo un problema al crear el turno");
		}
	};

	const fetchAppointment = async (UUID: string) => {
		try {
			const data = await getAppointmentById(UUID);
			setFormData({
				...data,
				date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
			});
		} catch (error) {
			console.error("Error al obtener el turno:", error);
		}
	};

	useEffect(() => {
		const loadAppointment = async () => {
			if (isOpen) {
				if (UUID) {
					await fetchAppointment(UUID);
				}
			}
		};
		loadAppointment();
	}, [isOpen, UUID]);

	if (!isOpen) return null;

	return (
		<div>
			<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white p-5 rounded-lg w-[500px] space-y-6">
					<h2 className="text-2xl font-bold text-center">Nuevo Turno</h2>

					<div>
						<div className="flex flex-col">
							<label
								htmlFor="branch"
								className="text-xs sm:text-sm font-bold mb-1 text-center"
							>
								Sucursal
							</label>
							<select
								id="branch"
								name="branch"
								value={formData?.branch}
								onChange={handleChange}
								className="border bg-[#C8C8C8] p-3 rounded-lg sm:w-auto w-full"
							>
								<option value="014a9b22-f615-4d56-bf7c-23db927dcdd1">Sucursal Prueba</option>
								<option value="sucursal2">Sucursal 2</option>
								<option value="sucursal3">Sucursal 3</option>
							</select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Barbero</label>
							<input
								type="text"
								name="barber"
								value={formData?.barber}
								onChange={handleChange}
								placeholder="Barbero N° 1"
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Cliente</label>
							<input
								type="text"
								name="client_name"
								value={formData?.client_name}
								onChange={handleChange}
								placeholder="Nombre del Cliente"
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Fecha</label>
							<input
								type="date"
								name="date"
								value={formData?.date ? new Date(formData.date).toISOString().split("T")[0] : ""}
								onChange={handleChange}
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Servicio</label>
							<input
								type="text"
								name="service"
								value={formData?.services}
								onChange={handleChange}
								placeholder="Ejemplo: Corte clásico"
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Monto</label>
							<input
								type="number"
								name="price"
								value={formData?.price}
								onChange={handleChange}
								placeholder="Monto del servicio"
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Método de Pago</label>
							<select
								title="metodoPago"
								name="paymentMethod"
								value={formData?.paymentMethod}
								onChange={handleChange}
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							>
								<option value="cash">Cash</option>
								<option value="transfer">Transferencia</option>
							</select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Estado</label>
							<select
								title="estado"
								name="status"
								value={formData?.status}
								onChange={handleChange}
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							>
								<option value="pending">Pendiente</option>
								<option value="paid">Pagado</option>
								<option value="completed">Completado</option>
								<option value="cancelled">Cancelado</option>
							</select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Teléfono</label>
							<input
								type="text"
								name="client_phone"
								value={formData?.client_phone}
								onChange={handleChange}
								placeholder="Número de teléfono"
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							/>
						</div>
					</div>

					<div className="flex items-center justify-center gap-4 pt-4">
						<button
							onClick={closeModal}
							className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
						>
							Cancelar
						</button>
						<button
							onClick={handleSubmit}
							className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
						>
							Aceptar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
