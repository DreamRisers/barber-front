"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faUpload } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

const BarberPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveBarberModalOpen, setIsRemoveBarberModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRemoveBarberModal = () => {
    setIsRemoveBarberModalOpen(true);
  };

  const closeRemoveBarberModal = () => {
    setIsRemoveBarberModalOpen(false);
  };

  return (
    <div>
      <div>
        <p className="flex justify-center items-center pb-10 font-bold text-2xl">
          BARBEROS
        </p>
        <div className="bg-barberBgGrey h-[190px] w-full sm:w-[458px] rounded-md">
          <div className="flex justify-between p-2">
            <p className="font-bold text-sm sm:text-base">Barbero n°1</p>
            <button
              className="font-semibold text-red-500 border bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center"
              onClick={openRemoveBarberModal}
            >
              x
            </button>
          </div>
          <div
            className="flex items-center justify-center h-[120px] hover:cursor-pointer"
            onClick={openModal}
          >
            <FontAwesomeIcon
              icon={faUserPen}
              className="w-16 h-16 sm:w-20 sm:h-20 text-black-400"
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg w-[600px] space-y-6">
            <h2 className="text-2xl font-bold text-center">Barbero N°1</h2>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-2">
                <label className="text-sm font-bold">Nombre</label>
                <input
                  type="text"
                  placeholder="Barbero N° 1"
                  className="bg-barberBgGrey border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Experiencia</label>
                <input
                  type="text"
                  placeholder="3 años"
                  className="bg-barberBgGrey border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
            </div>

            <div className="space-y-2 text-center flex flex-col items-center justify-center">
              <label className="text-sm font-bold">Especialidades</label>
              <input
                type="text"
                placeholder="Corte clásico, Degradé, Perfilado de barba"
                className="bg-barberBgGrey border border-gray-300 p-3 rounded-md w-[80%] "
              />
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-barberBgGrey rounded-lg">
              <FontAwesomeIcon
                icon={faUpload}
                className="fa-solid fa-upload w-10 h-10 mb-2"
              />
              <span className="text-sm font-bold">Barber Pic</span>
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

      {isRemoveBarberModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg w-[600px] space-y-6">
            <h2 className="text-2xl font-medium text-center">{`Estás seguro que deseas eliminar a "Barbero n°1"`}</h2>

            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={closeRemoveBarberModal}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={closeRemoveBarberModal}
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
};

export default BarberPage;
