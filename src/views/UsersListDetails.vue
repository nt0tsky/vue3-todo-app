<template>
  <div class="users-list-details">
    <router-view />
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {ActionTypes} from "@/store/actions";

export default defineComponent({
  data() {
    return {
      limit: 5
    }
  },

  created() {
    const {limit, $store, $route} = this;
    const page = $route.query.page || $store.state.users.page || 1;

    this.$store.dispatch(ActionTypes.GET_USERS, {page, limit});
  }
})
</script>