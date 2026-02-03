<script setup lang="ts">
import { useForm, Field as VeeField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema, type LoginInput } from '~/utils/validators'

definePageMeta({
  layout: 'auth',
})

const supabase = useSupabaseClient()
const isLoading = ref(false)
const errorMessage = ref('')

const { handleSubmit } = useForm<LoginInput>({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  errorMessage.value = ''

  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })

  if (error) {
    errorMessage.value = error.message
    isLoading.value = false
    return
  }

  navigateTo('/dashboard')
})
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader class="text-center">
      <CardTitle class="text-2xl">Sign In</CardTitle>
      <CardDescription>
        Enter your email and password to access your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form class="space-y-4" @submit="onSubmit">
        <Alert v-if="errorMessage" variant="destructive">
          <AlertDescription>{{ errorMessage }}</AlertDescription>
        </Alert>

        <VeeField v-slot="{ field, errors }" name="email">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Email</FieldLabel>
            <Input
              v-bind="field"
              type="email"
              placeholder="you@example.com"
              :aria-invalid="!!errors.length"
              :disabled="isLoading"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>

        <VeeField v-slot="{ field, errors }" name="password">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Password</FieldLabel>
            <Input
              v-bind="field"
              type="password"
              :aria-invalid="!!errors.length"
              :disabled="isLoading"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>

        <Button type="submit" class="w-full" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </Button>
      </form>
    </CardContent>
    <CardFooter class="flex flex-col gap-2 text-center text-sm">
      <NuxtLink to="/forgot-password" class="text-muted-foreground hover:underline">
        Forgot your password?
      </NuxtLink>
      <div class="text-muted-foreground">
        Don't have an account?
        <NuxtLink to="/register" class="text-foreground hover:underline">
          Sign up
        </NuxtLink>
      </div>
    </CardFooter>
  </Card>
</template>
