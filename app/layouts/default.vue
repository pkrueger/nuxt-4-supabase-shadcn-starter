<script setup lang="ts">
import { Icon } from '@iconify/vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

async function signOut() {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <div class="container mx-auto flex h-16 items-center justify-between px-4">
        <NuxtLink to="/dashboard" class="text-xl font-bold">
          Dashboard
        </NuxtLink>
        <div class="flex items-center gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                <Avatar class="h-8 w-8">
                  <AvatarFallback>
                    {{ user?.email?.charAt(0).toUpperCase() ?? 'U' }}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56" align="end">
              <DropdownMenuLabel class="font-normal">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium leading-none">Account</p>
                  <p class="text-xs leading-none text-muted-foreground">
                    {{ user?.email }}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="signOut">
                <Icon icon="lucide:log-out" class="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
    <main class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>
