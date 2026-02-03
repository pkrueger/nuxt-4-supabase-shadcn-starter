<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <Card>
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>
          You are signed in as {{ user?.email }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-muted-foreground">
          This is a protected page. You can only see this if you're signed in.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
