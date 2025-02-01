"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ICliente } from "@/interfaces/types";
import ModalAppointment from "@/components/ModalAppointment";
import { getAllAppointments } from "@/helpers/appointments";

const TurnosPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Este es para saber que appointment selecciono
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(true);

  // Estos son los appointments actualizados
  const [appointments, setAppointments] = useState<ICliente[]>();

  // Si se pasa un id se deberia abrir el modal con ese id, si no, solo se abre el modal con campos vacios
  const openModal = (id?: string) => {
    setSelectedAppointmentId(id ?? null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointmentId(null);
  };

  const visibleHeaders = ["CLIENTE", "METODO PAGO", "MONTO"];
  const hiddenHeaders = [
    "SUCURSAL",
    "BARBERO",
    "TELEFONO",
    "SERVICIO",
    "FECHA",
    "ESTADO",
  ];

  const visibleFields: (keyof ICliente)[] = ["cliente", "metodo_pago", "monto"];
  const hiddenFields: (keyof ICliente)[] = [
    "sucursal",
    "barbero",
    "telefono",
    "servicio",
    "fecha",
    "estado_pago",
  ];
  // en la const appointments deberian estar todos los appointments
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
    (total, cliente) => total + parseFloat(cliente.monto),
    0
  );

  if (loading) return <p>Cargando turnos...</p>;

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
                <td
                  colSpan={visibleFields.length + hiddenFields.length + 1}
                  className="px-4 py-2 border text-center"
                >
                  No hay turnos agendados.
                </td>
              </tr>
            ) : (
              appointments?.map((cliente, index) => (
                <tr key={index} className="bg-[#C8C8C8] hover:bg-[#dad9d9]">
                  {visibleFields.map((field) => (
                    <td key={field} className="px-4 py-2 border">
                      {cliente[field]}
                    </td>
                  ))}
                  {hiddenFields.map((field) => (
                    <td key={field} className="px-4 py-2 border max-lg:hidden">
                      {cliente[field]}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-center">
                    <FontAwesomeIcon
                      icon={faUserPen}
                      className="cursor-pointer text-blue-500"
                      onClick={() => openModal(cliente.id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-[700px] space-y-6">
            <h2 className="text-2xl font-bold text-center">Nuevo Turno</h2>

            <div>
              <div className="flex flex-col">
                <label
                  htmlFor="sucursal"
                  className="text-xs sm:text-sm font-bold mb-1 text-center"
                >
                  Sucursal
                </label>
                <select
                  id="sucursal"
                  className="border bg-[#C8C8C8] p-3 rounded-lg sm:w-auto w-full"
                >
                  <option value="sucursal1">Sucursal 1</option>
                  <option value="sucursal2">Sucursal 2</option>
                  <option value="sucursal3">Sucursal 3</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Barbero</label>
                <input
                  type="text"
                  placeholder="Barbero N° 1"
                  className="bg-barberBgGrey border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Cliente</label>
                <input
                  type="text"
                  placeholder="Nombre del Cliente"
                  className="bg-barberBgGrey border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Fecha</label>
                <input
                  title="Fecha"
                  type="date"
                  className="bg-barberBgGrey border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Servicio</label>
                <input
                  type="text"
                  placeholder="Ejemplo: Corte clásico"
                  className="bg-barberBgGrey border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Monto</label>
                <input
                  type="number"
                  placeholder="Monto del servicio"
                  className="bg-barberBgGrey border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Método de Pago</label>
                <select
                  title="Metodo de Pago"
                  className="bg-barberBgGrey border border-gray-300 p-2 rounded-md w-full"
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Estado</label>
                <select
                  title="Estado de Pago"
                  className="bg-barberBgGrey border border-gray-300 p-2 rounded-md w-full"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="pagado">Pagado</option>
                  <option value="pagado">Cancelado</option>
                  <option value="pagado">Completado</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Teléfono</label>
                <input
                  type="text"
                  placeholder="Número de teléfono"
                  className="bg-barberBgGrey border border-gray-300 p-2 rounded-md w-full"
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
                onClick={closeModal}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      <ModalAppointment isOpen={isModalOpen} UUID={selectedAppointmentId} />
    </div>
  );
};

export default TurnosPage;
