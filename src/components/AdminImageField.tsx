"use client";

import { ChangeEvent, useRef, useState } from "react";
import { FiImage, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";

export default function AdminImageField({
  name = "imageUrl",
  value,
  label = "Cover image",
}: {
  name?: string;
  value?: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(value || "");
  const [preview, setPreview] = useState(value || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setError("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      return;
    }
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");
      setImageUrl(result.secure_url);
      setPreview(result.secure_url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
      setPreview(imageUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void upload(file);
  };

  const remove = () => {
    setImageUrl("");
    setPreview("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <input type="hidden" name={name} value={imageUrl} />
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const file = event.dataTransfer.files?.[0];
          if (file) void upload(file);
        }}
        className="relative overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50"
      >
        {preview ? (
          <div className="group relative aspect-[16/9] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="h-full w-full object-cover" />
            <button type="button" onClick={remove} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg bg-white text-slate-700 shadow" aria-label="Remove image"><FiTrash2 /></button>
            <button type="button" onClick={() => inputRef.current?.click()} className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-slate-950/80 px-3 py-2 text-xs font-semibold text-white"><FiUploadCloud /> Replace</button>
          </div>
        ) : (
          <button type="button" onClick={() => inputRef.current?.click()} className="flex min-h-44 w-full flex-col items-center justify-center px-6 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-sky-50 text-xl text-sky-600"><FiImage /></span>
            <span className="mt-3 text-sm font-semibold text-slate-800">Drop an image here or choose a file</span>
            <span className="mt-1 text-xs text-slate-500">JPG, PNG or WebP · Max 5 MB</span>
          </button>
        )}
        {uploading && <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-200"><div className="h-full w-2/3 animate-pulse bg-sky-500" /></div>}
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} className="hidden" />
      {error && <p className="mt-2 flex items-center gap-2 text-xs font-medium text-red-600"><FiX /> {error}</p>}
    </div>
  );
}
