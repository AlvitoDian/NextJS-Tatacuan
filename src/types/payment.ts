export interface PaymentPayload {
  plnid: string;
  amount: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
}
