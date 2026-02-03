<script setup lang="ts">
import { useForm, Field as VeeField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema, type RegisterInput } from '~/utils/validators'

definePageMeta({
  layout: 'auth',
})

const supabase = useSupabaseClient()
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { handleSubmit } = useForm<RegisterInput>({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        first_name: values.firstName,
        last_name: values.lastName,
      },
    },
  })

  if (error) {
    errorMessage.value = error.message
    isLoading.value = false
    return
  }

  successMessage.value = 'Check your email for the confirmation link!'
  isLoading.value = false
})
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader class="text-center">
      <CardTitle class="text-2xl">Create Account</CardTitle>
      <CardDescription>
        Enter your details to create a new account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form class="space-y-4" @submit="onSubmit">
        <Alert v-if="errorMessage" variant="destructive">
          <AlertDescription>{{ errorMessage }}</AlertDescription>
        </Alert>

        <Alert v-if="successMessage">
          <AlertDescription>{{ successMessage }}</AlertDescription>
        </Alert>

        <div class="grid grid-cols-2 gap-4">
          <VeeField v-slot="{ field, errors }" name="firstName">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>First Name</FieldLabel>
              <Input
                v-bind="field"
                type="text"
                placeholder="John"
                :aria-invalid="!!errors.length"
                :disabled="isLoading || !!successMessage"
              />
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>

          <VeeField v-slot="{ field, errors }" name="lastName">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Last Name</FieldLabel>
              <Input
                v-bind="field"
                type="text"
                placeholder="Doe"
                :aria-invalid="!!errors.length"
                :disabled="isLoading || !!successMessage"
              />
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>
        </div>

        <VeeField v-slot="{ field, errors }" name="email">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Email</FieldLabel>
            <Input
              v-bind="field"
              type="email"
              placeholder="you@example.com"
              :aria-invalid="!!errors.length"
              :disabled="isLoading || !!successMessage"
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
              :disabled="isLoading || !!successMessage"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>

        <VeeField v-slot="{ field, errors }" name="confirmPassword">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Confirm Password</FieldLabel>
            <Input
              v-bind="field"
              type="password"
              :aria-invalid="!!errors.length"
              :disabled="isLoading || !!successMessage"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>

        <Button type="submit" class="w-full" :disabled="isLoading || !!successMessage">
          {{ isLoading ? 'Creating account...' : 'Create Account' }}
        </Button>
      </form>
    </CardContent>
    <CardFooter class="text-center text-sm">
      <div class="text-muted-foreground w-full">
        Already have an account?
        <NuxtLink to="/login" class="text-foreground hover:underline">
          Sign in
        </NuxtLink>
      </div>
    </CardFooter>
  </Card>
</template>
