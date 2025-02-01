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

export const AppointmentStatusTranslations = {
	pending: "Pendiente",
	paid: "Pagado",
	completed: "Completado",
	cancelled: "Cancelado",
};

export const PaymentMethodTranslations = {
	cash: "Efectivo",
	transfer: "Transferencia",
};

export interface IBarber {
	barberId: string;
	name: string;
}

export interface IBranch {
	id: string;
	name: string;
}

export interface INewAppointment {
	price: number;
	services: string;
	client_name: string;
	client_phone: string;
	status: AppointmentStatus;
	paymentMethod: PaymentMethod;
	date: string;
	barber: IBarber;
	branch: IBranch;
}

export interface IAppointment extends INewAppointment {
	id: string;
}

export interface IModalProps {
	isOpen: boolean;
	UUID?: string | undefined | null;
	onClose: () => void;
}
