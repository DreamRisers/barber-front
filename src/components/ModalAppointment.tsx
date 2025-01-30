
export default function ModalAppointment() {
    return (
       <div>
        {isModalOpen && (
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
       </div>
    );
}
