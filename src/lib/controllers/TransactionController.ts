import { postTransaction } from "../models/Transaction";
import { successResponse, errorResponse } from "@/utils/apiResponse";
import { verifyUser } from "../models/User";

export async function createTransactionPublic(req: Request) {
  try {
    const { email, usrpw, category, description, amount, type, date } =
      await req.json();

    if (!email || !usrpw) {
      return errorResponse("Email dan password wajib diisi", 400);
    }

    const user = await verifyUser(email, usrpw);
    if (!user) {
      return errorResponse("Email atau password salah", 401);
    }

    if (!category || !amount || !type || !date) {
      return errorResponse("Data transaksi tidak lengkap", 400);
    }

    const transaction = await postTransaction({
      usrid: parseInt(user.usrid),
      catid: parseInt(category),
      notes: description || "",
      amount: parseFloat(amount),
      dcind: type,
      date,
    });

    return successResponse("Transaksi berhasil dibuat", transaction, 201);
  } catch (error) {
    console.error("Gagal membuat transaksi:", error);
    return errorResponse("Terjadi kesalahan di server", 500, error);
  }
}

export async function createTransaction(req: Request, session) {
  try {
    const { catid, notes, amount, dcind, date } = await req.json();

    if (!catid || !amount || !dcind || !date) {
      return errorResponse("Data transaksi tidak lengkap", 400);
    }

    if (!catid || !amount || !dcind || !date) {
      return errorResponse("Data transaksi tidak lengkap", 400);
    }

    const transaction = await postTransaction({
      usrid: session.user.usrid,
      catid,
      notes: notes || "",
      amount: parseFloat(amount),
      dcind,
      date,
    });

    return successResponse("Transaksi berhasil dibuat", transaction, 201);
  } catch (error) {
    console.error("Gagal membuat transaksi:", error);
    return errorResponse("Terjadi kesalahan di server", 500, error);
  }
}
