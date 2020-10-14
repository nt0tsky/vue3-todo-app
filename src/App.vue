<template>
  <div class="users-list__container">
    <router-view/>
  </div>
</template>

<style lang="scss">
.users-list__container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
