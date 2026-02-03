# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Starter template for Nuxt 4 applications with Supabase authentication and shadcn-vue components.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Dev server at http://localhost:3000
bun run build        # Production build
bun run preview      # Preview production build
bun run generate     # Generate static site
```

## Tech Stack

- **Framework**: Nuxt 4 with Vue 3 Composition API
- **Package Manager**: Bun
- **Database/Auth**: Supabase via `@nuxtjs/supabase`
- **UI Components**: shadcn-vue

## Architecture

- Nuxt 4 uses `app/` directory structure
- TypeScript config generated in `.nuxt/` during build
- Supabase auth via `@nuxtjs/supabase` module
- shadcn-vue components via `npx shadcn-vue@latest init`

---

## Development Workflow Guidelines

### Planning Phase

Before implementing non-trivial features, create a plan file in the `claude/` folder:

**File naming:** `{YYYYMMDD_HHMMSS}_{feature_name}_plan.md`

**Plan file structure:**
```markdown
# Feature: {Feature Name}
## Created: {Date/Time}
## Status: In Progress

### Problem Statement
[What problem this solves]

### Solution Approach
[High-level approach and key decisions]

### Task List
- [ ] Task 1: Description with acceptance criteria
- [ ] Task 2: Description with acceptance criteria

### Completed Tasks
(Move tasks here when done with ✅ and timestamp)

### Error Log
(Document errors and fixes here)
```

**Research before planning:**
- Explore existing composables, components, and patterns
- Check Supabase schema and RLS policies
- Review similar features in codebase
- Identify what needs creation vs modification

### Context Files

When reference material would help implementation, save to `claude/` folder:

**Naming:** `{unique_id}_{feature_name}_ctx_{descriptor}.{ext}`

Examples:
- `20250203_auth_ctx_schema.sql` - Database schema reference
- `20250203_dashboard_ctx_component.vue` - Component pattern example

Document in plan file:
```markdown
### Context Files
- `filename.ext`: Purpose description
```

### Implementation Checklist

Before writing code, validate:

**API/Composable Design:**
- [ ] Can default parameters handle all use cases instead of multiple functions?
- [ ] Is each function actually needed (YAGNI)?
- [ ] Does this match existing patterns in the codebase?
- [ ] What's the smallest API that meets requirements?

**Implementation:**
- [ ] Single responsibility per composable/component?
- [ ] Validation at system boundaries only (user input, API responses)?
- [ ] No premature abstractions - three similar lines beats a helper nobody needs?
- [ ] Error handling matches existing patterns?

**Nuxt/Vue Specific:**
- [ ] Using Composition API with `<script setup>`?
- [ ] Proper use of `useState`, `useFetch`, `useAsyncData`?
- [ ] Supabase client accessed via `useSupabaseClient()`?
- [ ] Auth state via `useSupabaseUser()`?

### Task Execution

When working through tasks:

1. **Select task** - Pick next uncompleted task from plan
2. **Verify size** - If task feels large, split it first
3. **Implement** - Follow the plan, use established patterns
4. **Update plan** - Mark complete with ✅ and timestamp
5. **Leave uncommitted** - Don't commit until feature is validated

### Error Handling

When errors occur, document in plan file:

```markdown
### Error Log

#### {Timestamp} - {Error Type}
- **Error:** [Message/stack trace summary]
- **Affected:** [Files/components involved]
- **Root Cause:** [Analysis]
- **Fix:** [What was done to resolve]
```

Create a fix task if needed:
```markdown
- [ ] FIX: {Error Description}
  - Error Type: [TypeScript/Runtime/Supabase/Build]
  - Affected: [List files]
  - Fix Strategy: [Approach]
```

### Resuming Work

When returning to an in-progress feature:

1. Read the plan file from `claude/` folder
2. Run `git status` and `git diff` to see current state
3. Compare changes against plan tasks
4. Update plan to reflect actual progress
5. Continue with next task

### Feature Completion

When all tasks are done:

1. Verify all tasks marked complete in plan
2. Run full test suite / manual validation
3. Update plan status to "Complete"
4. Add summary at top of plan file:

```markdown
## Completion Summary
- **Completed:** {Date}
- **Key Changes:** [List of major additions/modifications]
- **Files Created:** [New files]
- **Files Modified:** [Changed files]
```
