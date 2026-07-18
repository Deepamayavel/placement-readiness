"use client";
console.log("NEW DYNAMIC FORM LOADED");

import { useState } from "react";
import { formSchema } from "@/data/formSchema";

export default function DynamicForm() {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    id: string,
    value: string | number | boolean
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    let newErrors: any = {};

    formSchema.forEach((field: any) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }

      if (
        field.id === "age" &&
        formData.age &&
        Number(formData.age) <= 18
      ) {
        newErrors.age = "Age must be greater than 18";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      alert("Form Submitted Successfully!");
      console.log(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 space-y-5 bg-white p-6 rounded-xl shadow"
    >
      <h1 className="text-3xl font-bold text-center">
        Dynamic JSON Form
      </h1>

      {formSchema.map((field: any) => {

        if (
          field.showIf &&
          formData[field.showIf.field] !== field.showIf.value
        ) {
          return null;
        }

        return (
          <div key={field.id}>
            <label className="block font-medium mb-2">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                value={formData[field.id] || "Select"}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="border p-2 rounded w-full"
              >
                {field.options.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={!!formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.checked)}
                className="h-5 w-5"
              />
            ) : field.type === "radio" ? (
              <div className="flex gap-6">
                {field.options.map((option: string) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={field.id}
                      value={option}
                      checked={formData[field.id] === option}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="h-4 w-4"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <input
                type={field.type}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="border p-2 rounded w-full"
              />
            )}

            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.id]}
              </p>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}