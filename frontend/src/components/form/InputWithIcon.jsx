import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function InputWithIcon({ id, label, type, icon: Icon, register, error, placeholder }) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-sm text-gray-300">
        {label}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={18}
          />
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full bg-gray-800 border border-gray-600 text-white placeholder:text-gray-400
            rounded-md px-3 py-2 shadow-sm transition duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
            hover:border-emerald-500 ${Icon ? "pl-10" : ""}`}
          {...register(id)}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default InputWithIcon;
