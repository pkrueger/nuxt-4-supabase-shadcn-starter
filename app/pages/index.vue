<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const user = useSupabaseUser()

onMounted(() => {
  if (user.value) {
    navigateTo('/dashboard')
  }
})
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader class="text-center">
      <CardTitle class="text-2xl">Welcome</CardTitle>
      <CardDescription>
        Sign in to your account or create a new one
      </CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <Button as-child>
        <NuxtLink to="/login">Sign In</NuxtLink>
      </Button>
      <Button variant="outline" as-child>
        <NuxtLink to="/register">Create Account</NuxtLink>
      </Button>
    </CardContent>
  </Card>
</template>
