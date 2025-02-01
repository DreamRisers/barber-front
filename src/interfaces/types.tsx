export interface ICliente {
  id: string;
  sucursal: string;
  barbero: string;
  cliente: string;
  telefono: string;
  servicio: string;
  fecha: string;
  metodo_pago: string;
  estado_pago: string;
  monto: string;
}

export interface IModalProps {
  isOpen: boolean;
  UUID?: string | undefined | null;
}
