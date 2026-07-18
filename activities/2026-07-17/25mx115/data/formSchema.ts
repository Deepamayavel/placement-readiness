export const formSchema = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    required: true,
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    required: true,
    min: 19,
  },
  {
    id: "employed",
    label: "Are you employed?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: "company",
    label: "Company Name",
    type: "text",
    required: false,
    showIf: {
      field: "employed",
      value: "Yes",
    },
  },
];