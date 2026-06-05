# Custom Vocabulary

Custom vocabulary allows you to define domain-specific terms and preferred forms. These mappings are automatically injected into the system prompt during text refinement, ensuring specialized terminology is correctly handled.

## Vocabulary Fields

| Field | Description |
|---|---|
| **Term** | The word or phrase to watch for during refinement. |
| **Preferred** | The correct or preferred form that should be used instead. |
| **Note** | Optional context for the refinement engine (helps explain why this form is preferred). |

## How It Works

1. **Define Terms:** In the Custom Vocabulary section, add entries with Term, Preferred form, and optional Notes.
2. **Injection:** During text refinement, all custom terms are injected into the LLM's system prompt as a structured list.
3. **Refinement:** The LLM uses this guidance to replace detected terms with their preferred forms while preserving meaning and context.

## Example

| Term | Preferred | Note |
|---|---|---|
| VOVOCI | VOVOCI | Proper product name, always capitalized |
| refine | refine (as refinement function) | Not "improve" or "enhance" in this context |
| STT | STT (speech-to-text) | Acronym preference, keep as-is or expand to full form as needed |
| API key | API key | Two words, not "apikey" |

## Tips

- **Short Forms:** Use concise terms that frequently appear in your domain.
- **Context in Notes:** Add explanatory notes to help the LLM understand nuance (e.g., "specific company terminology," "technical acronym").
- **Regular Updates:** Periodically review and add new terms as your workflow evolves.
- **Testing:** After adding terms, test refinement on sample text to ensure the mappings work as expected.

## Storage

Custom vocabulary is stored in `config.json` under the `custom_vocabulary` field, persisting across application restarts.
