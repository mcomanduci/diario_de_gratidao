"use server";

import { v2 as cloudinary } from "cloudinary";

// Configura Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "Nenhum arquivo enviado" };
    }

    // Converte File para base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload para Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "diario",
      resource_type: "image",
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    return { success: false, error: "Erro ao fazer upload da imagem" };
  }
}

export async function deleteImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    return { success: false, error: "Erro ao deletar imagem" };
  }
}
