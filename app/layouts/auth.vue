<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex justify-end p-4">
      <ModeToggle />
    </header>
    <main class="flex-1 flex items-center justify-center px-4">
      <slot />
    </main>
  </div>
</template>
