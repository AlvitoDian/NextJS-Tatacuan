import { NextResponse } from "next/server";

export function successResponse(
  message: string,
  data: unknown = null,
  status: number = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(
  message: string,
  status: number = 500,
  error: unknown = null
) {
  return NextResponse.json(
    {
      success: false,
      message,
      error,
    },
    { status }
  );
}
