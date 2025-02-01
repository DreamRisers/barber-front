export enum AppointmentStatus {
	PENDING = "pending",
	PAID = "paid",
	COMPLETED = "completed",
	CANCELLED = "cancelled",
}

export enum PaymentMethod {
	CASH = "cash",
	TRANSFER = "transfer",
}

export interface INewAppointment {
	price: number;
	services: string;
	client_name: string;
	client_phone: string;
	status: AppointmentStatus;
	paymentMethod: PaymentMethod;
	date: string;
  barber: string;
  branch: string;
}
export interface IAppointments {
	id: string;
	price: number;
	services: string;
	client_name: string;
	client_phone: string;
	status: AppointmentStatus;
	paymentMethod: PaymentMethod;
	date: string;
  barber: string;
  branch: string;
}

export interface IModalProps {
	isOpen: boolean;
	UUID?: string | undefined | null;
	onClose: () => void;
}
