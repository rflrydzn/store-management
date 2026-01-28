import { supabase } from "./supabase/client";

export async function uploadImageAndGetUrl(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `/public/${fileName}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const { data } = await supabase.storage.from("images").getPublicUrl(filePath);

  return data.publicUrl;
}
