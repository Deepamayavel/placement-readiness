# Dynamic JSON Form Generator

## Overview

This project is a dynamic JSON-driven form generator built using Next.js and React.

Instead of hardcoding forms, the application reads a JSON schema and dynamically renders form fields. It supports nested sections, validation rules, and conditional field rendering.

Example:

- Age must be greater than 18.
- If "Employed" is selected, "Company Name" becomes visible.
- Supports text, number, checkbox, select, and nested objects.

---

## Features

- Dynamic form rendering from JSON schema
- Nested questionnaire support
- Validation engine
- Conditional rendering
- Responsive UI
- Easy to extend
- Clean component architecture

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod Validation

---

## Folder Structure

```
app/
components/
    DynamicForm.tsx
    FieldRenderer.tsx
schema/
    formSchema.json
utils/
    validator.ts
README.md
reflection.md
prompts.md
```

---

## JSON Schema Example

```json
{
  "fields":[
    {
      "type":"text",
      "label":"Full Name",
      "name":"name"
    },
    {
      "type":"number",
      "label":"Age",
      "name":"age",
      "validation":{
        "min":18
      }
    },
    {
      "type":"checkbox",
      "label":"Employed",
      "name":"employed"
    },
    {
      "type":"text",
      "label":"Company Name",
      "name":"company",
      "showIf":{
        "field":"employed",
        "equals":true
      }
    }
  ]
}
```

---

## Validation Rules

### Age Validation

```
Age > 18
```

Implemented using Zod and React Hook Form.

---

### Conditional Rendering

```
IF employed == true

THEN

Show Company Name
```

---

## Architecture

```
JSON Schema
      │
      ▼
Dynamic Form Component
      │
      ▼
Field Renderer
      │
      ▼
Validation Engine
      │
      ▼
React Hook Form
      │
      ▼
User Interface
```

---

## Time Complexity

### Rendering Fields

If there are N fields:

```
O(N)
```

Each field is rendered once.

---

### Validation

Each field validation executes once.

```
O(N)
```

---

### Conditional Logic

Current implementation checks all conditions.

```
Worst Case

O(N)
```

Can be optimized using dependency maps.

---

## Space Complexity

Form state stores each field.

```
O(N)
```

---

## Future Improvements

- Multi-step forms
- Drag-and-drop schema builder
- Async validation
- File upload fields
- API schema loading
- Form analytics
- Theme customization

---

## Running the Project

```bash
npm install

npm run dev
```

Open

```
http://localhost:3000
```

---

## Big-O Summary

| Operation | Complexity |
|------------|------------|
| Rendering | O(N) |
| Validation | O(N) |
| Conditional Rendering | O(N) |
| Memory | O(N) |
