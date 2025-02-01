import {
	createAppointment,
	editAppointment,
	getAppointmentById,
} from "@/helpers/appointments";
import { getAllBarbers } from "@/helpers/barbers";
import { getAllBranches } from "@/helpers/branches";
import {
	IModalProps,
	INewAppointment,
	IBarber,
	IBranch,
	AppointmentStatus,
	PaymentMethod,
} from "@/interfaces/types";
import { useEffect, useState } from "react";

export default function ModalAppointment({
	isOpen,
	UUID,
	onClose,
}: IModalProps) {
	const [formData, setFormData] = useState<INewAppointment>({
		price: 0,
		services: "",
		client_name: "",
		client_phone: "",
		status: AppointmentStatus.PENDING,
		paymentMethod: PaymentMethod.CASH,
		date: "",
		barber: { barberId: "", name: "" },
		branch: { id: "", name: "" },
	});
	const [barbers, setBarbers] = useState<IBarber[]>([]);
	const [branches, setBranches] = useState<IBranch[]>([]);

	const closeModal = () => {
		setFormData({
			price: 0,
			services: "",
			client_name: "",
			client_phone: "",
			status: AppointmentStatus.PENDING,
			paymentMethod: PaymentMethod.CASH,
			date: "",
			barber: { barberId: "", name: "" },
			branch: { id: "", name: "" },
		});

		UUID = null;
		onClose();
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;

		setFormData((prevData) => {
			if (!prevData) return prevData;

			if (type === "date") {
				return { ...prevData, [name]: value };
			}

			if (type === "number") {
				return { ...prevData, [name]: Number(value) || 0 };
			}

			return { ...prevData, [name]: value };
		});
	};

	const handleSubmit = async () => {
		if (!formData) return;

		try {
			if (UUID) {
				await editAppointment(UUID, formData);
				alert("Turno actualizado con éxito");
			} else {
				await createAppointment(formData);
				alert("Turno creado con éxito");
			}

			closeModal();
		} catch (error) {
			console.error("Error al guardar el turno:", error);
			alert("Hubo un problema al guardar el turno");
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

				const branchesData = await getAllBranches();
				setBranches(branchesData);

				const barbersData = await getAllBarbers();
				setBarbers(barbersData);
			}
		};
		loadAppointment();
	}, [isOpen, UUID]);

	if (!isOpen) return null;

	return (
		<div>
			<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white p-5 rounded-lg w-[500px] space-y-6">
					<h2 className="text-2xl font-bold text-center">
						{formData ? "Editar" : "Nuevo"} Turno
					</h2>

					<div>
						<div className="flex flex-col">
							<label
								htmlFor="branch"
								className="text-xs sm:text-sm font-bold mb-1 text-center"
							>
								Sucursal
							</label>
							<select
								name="branch"
								onChange={handleChange}
								defaultValue={formData?.branch.id}
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							>
								<option value="" disabled>
									Seleccione una sucursal
								</option>
								{branches.map((branch, index) => (
									<option key={branch.id || index} value={branch.id}>
										{branch.name}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Barbero</label>
							<select
								name="barber"
								onChange={handleChange}
								defaultValue={formData?.barber.barberId}
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							>
								<option value="" disabled>
									Seleccione un barbero
								</option>
								{barbers.map((barber, index) => (
									<option
										key={barber.barberId || index}
										value={barber.barberId}
									>
										{barber.name}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Cliente</label>
							<input
								type="text"
								name="client_name"
								onChange={handleChange}
								value={formData?.client_name}
								placeholder="Nombre del Cliente"
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Fecha</label>
							<input
								type="date"
								name="date"
								value={formData?.date}
								onChange={handleChange}
								className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-bold">Servicio</label>
							<input
								type="text"
								name="services"
								onChange={handleChange}
								value={formData?.services}
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
