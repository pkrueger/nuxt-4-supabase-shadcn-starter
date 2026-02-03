<script setup lang="ts">
import { useForm, Field as VeeField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { resetPasswordSchema, type ResetPasswordInput } from '~/utils/validators'

definePageMeta({
  layout: 'auth',
})

const supabase = useSupabaseClient()
const isLoading = ref(false)
const errorMessage = ref('')

const { handleSubmit } = useForm<ResetPasswordInput>({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    password: '',
    confirmPassword: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  errorMessage.value = ''

  const { error } = await supabase.auth.updateUser({
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
      <CardTitle class="text-2xl">Reset Password</CardTitle>
      <CardDescription>
        Enter your new password below
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form class="space-y-4" @submit="onSubmit">
        <Alert v-if="errorMessage" variant="destructive">
          <AlertDescription>{{ errorMessage }}</AlertDescription>
        </Alert>

        <VeeField v-slot="{ field, errors }" name="password">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>New Password</FieldLabel>
            <Input
              v-bind="field"
              type="password"
              :aria-invalid="!!errors.length"
              :disabled="isLoading"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>

        <VeeField v-slot="{ field, errors }" name="confirmPassword">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Confirm New Password</FieldLabel>
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
          {{ isLoading ? 'Updating...' : 'Update Password' }}
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
