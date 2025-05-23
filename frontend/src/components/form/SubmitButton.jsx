import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

function SubmitButton({ isLoading, children }) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={`w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-md 
        text-white bg-emerald-600 hover:bg-emerald-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 
        disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out`}
    >
      {isLoading ? (
        <>
          <Loader className="animate-spin cursor-not-allowed" size={18} />
          Please wait...
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export default SubmitButton;
