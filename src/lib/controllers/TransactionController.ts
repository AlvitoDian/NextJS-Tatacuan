import { postTransaction } from "../models/Transaction";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function createTransaction(req: Request, session) {
  try {
    const { usrid, catid, notes, amount, dcind, date } = await req.json();

    if (!usrid || !catid || !amount || !dcind || !date) {
      return errorResponse("Data transaksi tidak lengkap", 400);
    }

    const transaction = await postTransaction({
      usrid,
      catid,
      notes: notes || "",
      amount,
      dcind,
      date,
    });

    return successResponse("Transaksi berhasil dibuat", transaction, 201);
  } catch (error) {
    console.error("Gagal membuat transaksi:", error);
    return errorResponse("Terjadi kesalahan di server", 500, error);
  }
}
