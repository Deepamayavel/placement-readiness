# Reflection

## Overview

This challenge was useful because it was not really about building a single form. It was about building a form engine: one layer for schema, one layer for rendering, one layer for validation, and one layer for conditional visibility. That separation is what turns a one-off UI into something reusable for multiple client questionnaires.

## What I Learned

- A JSON schema is most valuable when it captures both structure and business rules.
- Conditional rendering and validation should use the same source of truth.
- Flat form state is easier to reason about than nested state when fields can depend on one another across sections.
- A small, explicit operator set is safer than a generic expression parser for enterprise forms.

## Main Design Decisions

The biggest decision was to keep the form data-driven instead of hardcoding field-specific logic in components. That meant a field like Company Name could be shown or hidden entirely from schema data, and the validator could reuse the same visibility decision before deciding whether a field is required.

I also preferred a flat values object over section-based nesting. That keeps dependency lookups constant time and avoids turning cross-section rules into search problems.

## Performance Notes

The important performance trade-off is that the engine uses linear passes for rendering, validation, and conditional evaluation. For the size of a consulting intake form, that is the correct choice: it is simple, predictable, and fast enough. The code stays easy to extend without introducing premature optimization.

## What I Would Improve Next

- Add automated tests for hidden-field validation and dependency chains.
- Add async validation for cases like unique identifiers or server-side checks.
- Support schema versioning so in-progress submissions survive form updates.
- Add accessibility checks and better keyboard navigation.

## Final Thought

The main takeaway is that maintainability comes from keeping the schema, rendering, and validation layers independent. Once those boundaries are clean, changing the questionnaire is mostly a data change instead of a code change.
