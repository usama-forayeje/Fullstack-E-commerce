import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";

export default function FileUpload({ id, label, onChange, error, accept = "*", className = "" }) {
  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={id} className="text-sm text-gray-300">
          {label}
        </Label>
      )}
      <div className="relative flex flex-col items-center justify-center bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-emerald-500 transition">
        <UploadCloud className="h-8 w-8 text-emerald-400 mb-2" />
        <p className="text-sm text-gray-400">Click to upload or drag file here</p>
        <Input
          id={id}
          type="file"
          accept={accept}
          onChange={onChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
