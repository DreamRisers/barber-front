import { createAppointment, getAppointmentById } from "@/helpers/appointments";
import { IModalProps } from "@/interfaces/types";
import { useEffect, useState } from "react";

// Modal appointment recibe opcionalmente el UUID de turno
export default function ModalAppointment({ isOpen, UUID }: IModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [formData, setFormData] = useState({
    id: "",
    sucursal: "",
    barbero: "",
    cliente: "",
    fecha: "",
    servicio: "",
    monto: "",
    metodo_pago: "",
    estado_pago: "",
    telefono: "",
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Si no se pasa uuid se deberia ejecutar esto
  const handleSubmit = async () => {
    try {
      await createAppointment(formData);
      alert("Turno creado con éxito");
      closeModal();
    } catch (error) {
      console.error("Error al crear el turno:", error);
      alert("Hubo un problema al crear el turno");
    }
  };

  if (!isModalOpen) {
    return null;
  }

  // si hay uuid se deberia ejecutar esto
  const fetchAppointment = async (UUID: string) => {
    try {
      const data = await getAppointmentById(UUID);
      setFormData(data);
    } catch (error) {
      console.error("Error al obtener el turno:", error);
    }
  };

  // Aca me falta que si hay uuid al tocar aceptar se ejecute una fx que haga un put al endpoint del appointment/{id}

  useEffect(() => {
    setIsModalOpen(isOpen);

    const loadAppointment = async () => {
      try {
        if (isOpen && UUID) {
          const data = await fetchAppointment(UUID);
          if (data) setFormData(data);
        } else if (isOpen) {
          setFormData({
            id: "",
            sucursal: "",
            barbero: "",
            cliente: "",
            fecha: "",
            servicio: "",
            monto: "",
            metodo_pago: "",
            estado_pago: "",
            telefono: "",
          });
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    loadAppointment();
  }, [isOpen, UUID]);

  if (UUID) {
    return (
      <div>
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-[500px] space-y-6">
            <h2 className="text-2xl font-bold text-center">Editar Turno</h2>

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
                  name="sucursal"
                  value={formData.sucursal}
                  onChange={handleChange}
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
                  name="barbero"
                  value={formData.barbero}
                  onChange={handleChange}
                  placeholder="Barbero N° 1"
                  className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Cliente</label>
                <input
                  type="text"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  placeholder="Nombre del Cliente"
                  className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  placeholder="Fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Servicio</label>
                <input
                  type="text"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  placeholder="Ejemplo: Corte clásico"
                  className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Monto</label>
                <input
                  type="number"
                  name="monto"
                  value={formData.monto}
                  onChange={handleChange}
                  placeholder="Monto del servicio"
                  className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Método de Pago</label>
                <select
                  title="metodo_pago"
                  name="metodo_pago"
                  value={formData.metodo_pago}
                  onChange={handleChange}
                  className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Estado</label>
                <select
                  title="estado"
                  name="estado_pago"
                  value={formData.estado_pago}
                  onChange={handleChange}
                  className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
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
                  name="telefono"
                  value={formData.telefono}
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

  return (
    <div>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-lg w-[500px] space-y-6">
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
                name="sucursal"
                value={formData.sucursal}
                onChange={handleChange}
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
                name="barbero"
                value={formData.barbero}
                onChange={handleChange}
                placeholder="Barbero N° 1"
                className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Cliente</label>
              <input
                type="text"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                placeholder="Nombre del Cliente"
                className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Fecha</label>
              <input
                type="date"
                name="fecha"
                placeholder="Fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Servicio</label>
              <input
                type="text"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                placeholder="Ejemplo: Corte clásico"
                className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Monto</label>
              <input
                type="number"
                name="monto"
                value={formData.monto}
                onChange={handleChange}
                placeholder="Monto del servicio"
                className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Método de Pago</label>
              <select
                title="metodoPago"
                name="metodoPago"
                value={formData.metodo_pago}
                onChange={handleChange}
                className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
              >
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Estado</label>
              <select
                title="estado"
                name="estado"
                value={formData.estado_pago}
                onChange={handleChange}
                className="bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
              >
                <option value="pendiente">Pendiente</option>
                <option value="pagado">Pagado</option>
                <option value="cancelado">Cancelado</option>
                <option value="completado">Completado</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
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
