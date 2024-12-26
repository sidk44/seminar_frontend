import React from "react";
import { useForm } from "react-hook-form";

const Form = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();

    return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 bg-gray-100 rounded"
    >
        <input
        {...register("date")}
        type="date"
        className="block w-full p-2 border"
        />
        <input
        {...register("timeSlot")}
        type="text"
        placeholder="Time Slot"
        className="block w-full p-2 border"
        />
        <textarea
        {...register("purpose")}
        placeholder="Purpose"
        className="block w-full p-2 border"
        />
        <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
        >
        Submit Request
        </button>
    </form>
    );
};

export default Form;
