import toast from "react-hot-toast";

export const toastError = (err: unknown) => {
  const message = (err as any)?.response?.data?.error || "An error occured";
  toast.error(message, { duration: 7 * 1000 });
};
