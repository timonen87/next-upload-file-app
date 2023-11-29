import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // С файловыми данными в буфере вы можете делать с ними все, что захотите.
  // Для этого мы просто запишем его в файловую систему в новом месте
  const path = `/uploads/${file.name}`;
  await writeFile(path, buffer);
  console.log(`Путь к файлу ${path}`);

  return NextResponse.json({ success: true });
}
