<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const user = useSupabaseUser()

watch(user, (value) => {
  if (value) {
    navigateTo('/dashboard')
  }
}, { immediate: true })
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader class="text-center">
      <CardTitle class="text-2xl">Confirming...</CardTitle>
      <CardDescription>
        Please wait while we verify your email
      </CardDescription>
    </CardHeader>
    <CardContent class="text-center">
      <div class="animate-pulse text-muted-foreground">
        Processing your confirmation...
      </div>
    </CardContent>
  </Card>
</template>
