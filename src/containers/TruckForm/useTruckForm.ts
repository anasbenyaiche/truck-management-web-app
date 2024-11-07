import { TruckFormInputs } from "@/types/ITruck";
import { useForm, SubmitHandler } from "react-hook-form";

const useTruckForm = (onSubmit: SubmitHandler<TruckFormInputs>) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TruckFormInputs>();
  console.log(watch());
  const handleFormSubmit = (data: TruckFormInputs) => {
    onSubmit(data);
    reset();
  };

  return {
    register,
    handleSubmit,
    handleFormSubmit,
    errors,
  };
};

export default useTruckForm;
