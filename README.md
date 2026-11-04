# Nuxt 4 + Supabase + shadcn-vue Starter

A starter template for building modern web applications with Nuxt 4, Supabase authentication, and shadcn-vue components.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) with Vue 3 Composition API
- **Package Manager**: [Bun](https://bun.sh/)
- **Authentication**: [Supabase](https://supabase.com/) via `@nuxtjs/supabase`
- **UI Components**: [shadcn-vue](https://www.shadcn-vue.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Form Validation**: [vee-validate](https://vee-validate.logaretm.com/) + [Zod](https://zod.dev/)
- **Icons**: [Nuxt Icon](https://nuxt.com/modules/icon) with Lucide icons
- **Dark Mode**: [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/)

## Features

- Email/password authentication with Supabase
- User registration with first/last name capture
- Email confirmation flow
- Password reset functionality
- Protected dashboard route
- Dark/light/system theme toggle
- Form validation with helpful error messages
- Responsive design

## Prerequisites

- [Bun](https://bun.sh/) installed
- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- [Docker](https://www.docker.com/) running (required for local Supabase)

## Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Start Local Supabase

```bash
supabase start
```

This will start the local Supabase stack. Once complete, you'll see output with your local credentials:

```
API URL: http://127.0.0.1:54331
anon key: eyJ...
service_role key: eyJ...
```

### 3. Configure Environment Variables

Copy the example environment file and add your Supabase credentials:

```bash
cp .env.example .env
```

Update `.env` with the values from `supabase start`:

```env
SUPABASE_URL=http://127.0.0.1:54331
SUPABASE_KEY=your-anon-key-from-supabase-start
```

### 4. Start Development Server

```bash
bun run dev
```

The app will be available at **http://localhost:4000**

## Local Development URLs

| Service | URL |
|---------|-----|
| Nuxt App | http://localhost:4000 |
| Supabase API | http://127.0.0.1:54331 |
| Supabase Studio | http://127.0.0.1:54333 |
| Inbucket (Email Testing) | http://127.0.0.1:54334 |

## Email Confirmation Flow

This starter has email confirmation **enabled** by default. When a user registers:

1. User fills out the registration form
2. Supabase sends a confirmation email
3. **For local development**: View the email at [Inbucket](http://127.0.0.1:54334)
4. User clicks the confirmation link
5. User is redirected to the dashboard

### Testing Emails Locally

Inbucket captures all emails sent by local Supabase. You can use any email address (even fake ones like `test@example.com`) - all emails are captured regardless of the address.

### Disabling Email Confirmation (Optional)

If you prefer users to be auto-confirmed during development, edit `supabase/config.toml`:

```toml
[auth.email]
enable_confirmations = false
```

Then restart Supabase:

```bash
supabase stop && supabase start
```

## Project Structure

```
app/
├── assets/css/tailwind.css    # Tailwind config with shadcn theme
├── components/
│   ├── ui/                    # shadcn-vue components
│   └── ModeToggle.vue         # Theme switcher
├── layouts/
│   ├── auth.vue               # Centered layout for auth pages
│   └── default.vue            # App layout with header
├── lib/utils.ts               # Utility functions (cn)
├── pages/
│   ├── index.vue              # Landing page
│   ├── login.vue              # Sign in
│   ├── register.vue           # Sign up with name capture
│   ├── forgot-password.vue    # Request password reset
│   ├── reset-password.vue     # Set new password
│   ├── confirm.vue            # Email verification callback
│   └── dashboard/index.vue    # Protected dashboard
└── utils/validators.ts        # Zod validation schemas
```

## Authentication Routes

| Route | Purpose | Protected |
|-------|---------|-----------|
| `/` | Landing page | No |
| `/login` | Sign in | No |
| `/register` | Create account | No |
| `/forgot-password` | Request reset email | No |
| `/reset-password` | Set new password | No |
| `/confirm` | Email verification callback | No |
| `/dashboard` | User dashboard | Yes |

## Accessing User Data

```ts
// Get the current user
const user = useSupabaseUser()

// Access user metadata (set during registration)
const firstName = user.value?.user_metadata?.first_name
const lastName = user.value?.user_metadata?.last_name
const email = user.value?.email

// Get the Supabase client for API calls
const supabase = useSupabaseClient()
```

## Adding shadcn-vue Components

```bash
bunx shadcn-vue@latest add [component-name]
```

See available components at [shadcn-vue.com](https://www.shadcn-vue.com/docs/components)

## Managing Multiple Local Supabase Projects

If you have other projects using local Supabase, this starter uses different ports to avoid conflicts:

- API: 54331 (default is 54321)
- Database: 54332 (default is 54322)
- Studio: 54333 (default is 54323)
- Inbucket: 54334 (default is 54324)

You can run multiple local Supabase instances simultaneously.

## Production Deployment

### 1. Create a Supabase Project

Create a project at [supabase.com](https://supabase.com/dashboard) and get your production credentials.

### 2. Configure Production Environment

Update your production environment variables:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-production-anon-key
```

### 3. Configure Supabase Auth Settings

In your Supabase dashboard under **Authentication > URL Configuration**:

- **Site URL**: Your production URL (e.g., `https://myapp.com`)
- **Redirect URLs**: Add your auth callback URLs:
  - `https://myapp.com/confirm`
  - `https://myapp.com/reset-password`

### 4. Build for Production

```bash
bun run build
```

### 5. Preview Production Build

```bash
bun run preview
```

## Useful Commands

```bash
bun run dev       # Start dev server
bun run build     # Build for production
bun run preview   # Preview production build
bun run generate  # Generate static site

supabase start    # Start local Supabase
supabase stop     # Stop local Supabase
supabase status   # Check Supabase status
supabase db reset # Reset database (runs migrations + seed)
```

## Resources

- [Nuxt Documentation](https://nuxt.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn-vue Documentation](https://www.shadcn-vue.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [vee-validate Documentation](https://vee-validate.logaretm.com/v4/)

## License

[MIT](LICENSE)
