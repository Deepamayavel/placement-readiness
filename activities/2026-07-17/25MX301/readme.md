# Deloitte USI Technical Challenge
## Dynamic JSON-Driven Form Generator

## Overview

This submission describes a dynamic JSON-driven form generator for a consulting questionnaire. The key idea is to treat the form as data, not as hand-written JSX: the schema defines sections, fields, validation rules, and conditional visibility, while the renderer turns that schema into UI at runtime.

That separation is what makes the solution scalable. A new client questionnaire should be a new JSON file, not a new form component tree.

---

## Problem Statement

Build a form engine that:

- Reads a nested questionnaire from JSON.
- Renders fields dynamically in React/Next.js.
- Validates required fields and rule-based constraints.
- Supports conditional logic such as showing Company Name only when Employed is checked.
- Handles nested sections without hardcoding field names into the UI.

Example business rules:

- Age must be greater than 18.
- If Employed is selected, show Company Name.
- If a field is hidden, it should not block submission.

---

## Schema Design

The questionnaire can be modeled as a tree of sections and fields.

```json
{
     "title": "Employee Registration",
     "sections": [
          {
               "id": "personal",
               "label": "Personal Details",
               "fields": [
                    { "id": "name", "type": "text", "label": "Full Name", "required": true },
                    { "id": "age", "type": "number", "label": "Age", "validation": { "minExclusive": 18 } },
                    { "id": "employed", "type": "checkbox", "label": "Employed" },
                    {
                         "id": "companyName",
                         "type": "text",
                         "label": "Company Name",
                         "required": true,
                         "conditional": { "dependsOn": "employed", "operator": "equals", "value": true }
                    }
               ]
          }
     ]
}
```

This schema keeps all business rules in one place:

- `type` decides which UI component renders.
- `validation` decides which checks run.
- `conditional` decides whether the field is visible.

---

## Architecture

```text
JSON Schema
      ↓
Schema Parser
      ↓
Field Registry → renders the correct input component by type
      ↓
Conditional Engine → decides which fields are visible
      ↓
Validation Engine → checks required and custom rules
      ↓
React State + Submission Handler
```

### Responsibilities

**Schema parser**
- Reads the JSON definition.
- Normalizes sections and fields into a predictable structure.

**Field registry**
- Maps field types such as text, number, checkbox, and select to reusable components.
- Keeps rendering logic extensible.

**Conditional engine**
- Evaluates whether a field should be visible from the current answers.
- Supports dependency-based rules like Employed → Company Name.

**Validation engine**
- Runs required checks, numeric bounds, pattern checks, and custom rules.
- Skips hidden fields so conditional UI and validation stay consistent.

**State layer**
- Stores answers in a flat key/value map.
- Makes cross-section dependencies easy to evaluate.

---

## Validation Rules

Examples supported by the schema-driven validator:

| Field | Rule |
|-------|------|
| Name | Required |
| Age | Must be greater than 18 |
| Email | Must match email format |
| Company Name | Required only when employed |

The important design choice is that validation happens against the current visibility state. If a field is hidden by conditional logic, it is excluded from required checks and submission errors.

---

## Conditional Rendering Flow

```
Employed = false → hide Company Name
Employed = true  → show Company Name
```

That dependency is evaluated from data, not from hardcoded UI branching. The same mechanism can be extended to support more operators later, such as `notEquals`, `includes`, or `truthy`.

---

## Big-O Analysis

### Rendering

Every field is visited once when building the visible questionnaire.

**Time complexity:** O(n)

### Validation

Each visible field is validated once during submission.

**Time complexity:** O(n)

### Conditional evaluation

Each conditional field checks its dependency using a direct lookup.

**Time complexity:** O(n)

### Space usage

The engine stores current form values and error state.

**Space complexity:** O(n)

### Trade-off

The chosen approach favors clarity and maintainability over micro-optimization. A linear pass over a consulting questionnaire is fast enough for the expected field count, and it keeps the code easy to extend. If the schema grew to hundreds of fields with expensive async rules, the next optimization would be incremental validation for only the changed field and its dependents.

---

## Scalability Notes

The architecture separates:

- Schema definition
- Rendering
- Validation
- Conditional visibility
- Form state

This makes the system easier to evolve in enterprise settings because new field types or rules can be introduced without rewriting the entire form.

---

## Future Improvements

- Async validation for server-side checks
- Multi-step wizard support
- Schema versioning for evolving client questionnaires
- Accessibility improvements for keyboard and screen-reader users
- File upload and rich input support
- Schema authoring tools for non-developers

---

## Tech Stack

- Next.js
- React
- JSON
- CSS

---

## Conclusion

This challenge is a good example of configuration-driven UI design. By moving the questionnaire structure and business rules into JSON, the form generator becomes reusable, easier to maintain, and easier to scale across different client workflows.
