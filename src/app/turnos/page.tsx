"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { IAppointments } from "@/interfaces/types";
import ModalAppointment from "@/components/ModalAppointment";
import { getAllAppointments } from "@/helpers/appointments";

const TurnosPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
		null
	);
	const [loading, setLoading] = useState(true);

	const [appointments, setAppointments] = useState<IAppointments[]>();

	const openModal = (id?: string) => {
		setSelectedAppointment(id ?? null);
		setIsModalOpen(true);
	};

	const visibleHeaders = ["CLIENTE", "MÉTODO DE PAGO", "MONTO"];
	const hiddenHeaders = [
		"SUCURSAL",
		"BARBERO",
		"TELÉFONO",
		"SERVICIO",
		"FECHA",
		"ESTADO",
	];

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const appointments = await getAllAppointments();
				setAppointments(appointments);
			} catch (err) {
				console.error("Error al obtener los turnos:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchAppointments();
	}, []);

	const totalMonto = appointments?.reduce(
		(total, appointment) => total + appointment.price,
		0
	);

	if (loading) return null;

	return (
		<div>
			<h1 className="text-center font-bold text-2xl mb-6">TURNOS</h1>
			<div className="lg:flex lg:justify-between w-full ">
				<div className="flex max-lg:flex-col max-lg:justify-center gap-4 max-lg:gap-8">
					<div className="flex flex-col">
						<label
							htmlFor="fechaInicio"
							className="text-sm font-bold mb-1 text-center"
						>
							Desde
						</label>
						<input
							id="fechaInicio"
							type="date"
							className="border bg-[#C8C8C8] p-2 rounded-lg "
						/>
					</div>

					<div className="flex flex-col">
						<label
							htmlFor="fechaFin"
							className="text-sm font-bold mb-1 text-center"
						>
							Hasta
						</label>
						<input
							id="fechaFin"
							type="date"
							className="border bg-[#C8C8C8] p-2 rounded-lg"
						/>
					</div>

					<div className="flex flex-col">
						<label
							htmlFor="sucursal"
							className="text-sm font-bold mb-1 text-center"
						>
							Sucursal
						</label>
						<select
							id="sucursal"
							className="border bg-[#C8C8C8] p-3 rounded-lg"
						>
							<option value="sucursal1">Sucursal 1</option>
							<option value="sucursal2">Sucursal 2</option>
							<option value="sucursal3">Sucursal 3</option>
						</select>
					</div>
				</div>
				<div className="w-full text-right flex justify-end h-fit">
					<button
						className="bg-green-700 text-white h-fit p-2 rounded-lg max-lg:w-full max-lg:mt-4"
						onClick={() => openModal()}
					>
						{" "}
						<FontAwesomeIcon
							icon={faPlus}
							className="cursor-pointer text-white mr-1"
							onClick={() => openModal()}
						/>
						Nuevo Turno
					</button>
				</div>
			</div>

			<div className="bg-[#C8C8C8] h-auto w-full mt-4 rounded-lg overflow-hidden">
				<table className="w-full table-auto border-solid ">
					<thead>
						<tr className="bg-[#C8C8C8]">
							{visibleHeaders.map((header) => (
								<th key={header} className="px-4 py-2 border">
									{header}
								</th>
							))}
							{hiddenHeaders.map((header) => (
								<th key={header} className="px-4 py-2 border max-lg:hidden">
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{appointments?.length === 0 ? (
							<tr>
								<td className="px-4 py-2 border text-center">
									No hay turnos agendados.
								</td>
							</tr>
						) : (
							appointments?.map((appointment) => (
								<tr
									key={appointment.id}
									className="bg-[#C8C8C8] hover:bg-[#dad9d9]"
								>
									<td className="px-4 py-2 border">
										{appointment.client_name}
									</td>
									<td className="px-4 py-2 border">
										{appointment.paymentMethod}
									</td>
									<td className="px-4 py-2 border">{appointment.price} ARS</td>
									<td className="px-4 py-2 border max-lg:hidden">
										{appointment.branch}
									</td>
									<td className="px-4 py-2 border max-lg:hidden">
										{appointment.barber}
									</td>
									<td className="px-4 py-2 border max-lg:hidden">
										{appointment.client_phone}
									</td>
									<td className="px-4 py-2 border max-lg:hidden">
										{appointment.services ?? "N/A"}
									</td>

									<td className="px-4 py-2 border max-lg:hidden">
										{appointment.date}
									</td>
									<td className="px-4 py-2 border max-lg:hidden">
										{appointment.status}
									</td>
									<td className="px-4 py-2 border text-center">
										<FontAwesomeIcon
											icon={faUserPen}
											className="cursor-pointer text-blue-500"
											onClick={() => openModal(appointment.id)}
										/>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>

				<div className="mt-4 text-right font-bold text-lg">
					<p className="hidden sm:block text-center">TOTAL: {totalMonto} ARS</p>
				</div>
			</div>

			<ModalAppointment
				isOpen={isModalOpen}
				UUID={selectedAppointment}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
};

export default TurnosPage;
