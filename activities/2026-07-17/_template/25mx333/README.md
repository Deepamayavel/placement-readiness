# Deloitte USI Technical Challenge
## Dynamic JSON-Driven Form Generator

## Overview

This project implements a dynamic JSON-driven form generator using **Next.js (React)**. Instead of hardcoding form fields, the application reads a JSON schema and dynamically renders the entire questionnaire. The solution supports nested fields, validation rules, and conditional rendering, making it scalable and reusable for enterprise applications such as consulting questionnaires.

---

## Problem Statement

Build a dynamic form generator that:

- Reads form structure from a JSON schema.
- Dynamically renders different input fields.
- Supports nested questionnaires.
- Validates user input.
- Displays fields conditionally based on previous answers.

Example:
- Age must be greater than 18.
- If **"Employed"** is selected, display the **"Company Name"** field.

---

## Features

- Dynamic form generation using JSON
- Nested questionnaire support
- Conditional rendering
- Form validation
- Error messages
- Responsive user interface
- Reusable React components
- Easy to extend with new field types

---

## Architecture

```
                    JSON Schema
                         │
                         ▼
                Dynamic Form Engine
                         │
        ┌────────────────┴───────────────┐
        ▼                                ▼
 Field Renderer                 Validation Engine
        │                                │
        ▼                                ▼
Conditional Logic               Error Handling
        │                                │
        └────────────────┬───────────────┘
                         ▼
                    React State
                         ▼
                     User Interface
```

### Component Responsibilities

**Dynamic Form**
- Reads JSON schema
- Maintains form state
- Handles submission

**Field Renderer**
- Renders input components dynamically
- Supports multiple field types

**Validation Engine**
- Required field validation
- Age validation
- Pattern validation
- Custom validation rules

**Conditional Logic**
- Evaluates dependencies
- Shows/Hides fields based on answers

---

## Validation Rules

Examples implemented:

| Field | Rule |
|-------|------|
| Age | Must be greater than 18 |
| Name | Required |
| Email | Valid email format |
| Company Name | Required only when employed |

---

## Conditional Rendering

Example:

```
Employed?

YES
 │
 ▼
Show Company Name

NO
 │
 ▼
Hide Company Name
```

---

## Big-O Analysis

### Form Rendering

Each field is rendered once.

**Time Complexity:** O(n)

where *n* is the number of fields.

---

### Validation

Every field is validated once during submission.

**Time Complexity:** O(n)

---

### Conditional Rendering

Each conditional field checks its dependency.

**Time Complexity:** O(n)

---

### Space Complexity

Stores current values and validation errors.

**Space Complexity:** O(n)

---

## Scalability

The architecture separates:

- UI
- Business Logic
- Validation
- Conditional Rules
- Form Schema

This allows adding new field types or validation rules without modifying the rendering logic.

---

## Future Improvements

- Multi-step forms
- API-driven schema loading
- File upload support
- Drag-and-drop form builder
- Async validation
- Theme customization
- Form persistence
- Internationalization

---

## Tech Stack

- Next.js
- React
- JavaScript
- JSON
- CSS

---

## Conclusion

The project demonstrates how enterprise applications can dynamically generate forms using configuration instead of hardcoded components. This improves maintainability, scalability, and reusability while keeping business rules independent of the UI implementation.
