<template>
  <div class="users-list-details">
    <router-view :current-page="currentPage" :total-pages="totalPages" :users="users" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ActionTypes } from "@/store/actions";

export default defineComponent({
  data() {
    return {
      limit: 5,
    };
  },

  computed: {
    users() {
      return this.$store.getters['users'];
    },

    currentPage() {
      return this.$store.getters["page"];
    },

    totalPages() {
      const { limit } = this;

      return this.$store.getters["total"] / limit;
    },
  },

  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(newState, oldState) {
        if (oldState && oldState?.query?.page === newState?.query?.page) {
          return;
        }

        const { limit, $store } = this;
        const page = newState.query.page || $store.state.users.page;

        this.$store.dispatch(ActionTypes.GET_USERS, {
          page: Number(page),
          limit,
        });
      },
    },
  },
});
</script>