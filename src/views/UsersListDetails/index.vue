<template>
  <div class="users-list">
    <div class="users-list__item users-list__header">
      <span class="users-list__col">name</span>
      <span class="users-list__col">email</span>
      <span class="users-list__col">phone</span>
    </div>
    <template v-if="users">
      <router-link :to="{ name: 'UsersListItem', params: { id: user.id }, query: { page: currentPage }}" class="users-list__item" v-for="(user) in users" :key="user.id">
        <span class="users-list__col">{{ user.name }}</span>
        <span class="users-list__col">{{ user.email }}</span>
        <span class="users-list__col">{{ user.phone }}</span>
      </router-link>
      <div class="users-list-pagination">
      <span
          class="users-list-pagination__item"
          @click="changePage(n)"
          v-for="(n, idx) in totalPages" :key="idx"
          :class="{'users-list-pagination__item--active': currentPage === n}"
      >
        {{ n }}
      </span>
      </div>
    </template>
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

  computed: {
    users() {
      return this.$store.getters['users'];
    },

    currentPage() {
      return this.$store.getters['page'];
    },

    totalPages() {
      const {limit} = this;

      return this.$store.getters['total'] / limit;
    }
  },

  methods: {
    changePage(page) {
      const {limit, currentPage} = this;

      if (currentPage === page) {
        return;
      }

      this.$store.dispatch(ActionTypes.GET_USERS, {page, limit});
    }
  }
})
</script>

<style lang="scss">
$pagination-color: #29b3ed;
$link-color: black;
$link-color-hover: #778CA2;

.users-list {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 15px;
  border-radius: 10px;
  background-color: white;

  .users-list-pagination {
    display: flex;
    align-items: center;

    .users-list-pagination__item {
      font-size: 16px;
      color: $pagination-color;
      padding: 5px;
      cursor: pointer;


      &.users-list-pagination__item--active,
      &:hover {
        font-weight: 600;
      }

      &:first-child {
        padding-left: 0;
      }
    }
  }

  .users-list__header {
    .users-list__col {
      font-weight: 600;
      text-transform: capitalize;
    }
  }

  .users-list__item {
    display: inherit;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    color: $link-color;
    text-decoration: unset;

    &:hover {
      color: $link-color-hover;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    .users-list__col {
      width: 300px;
    }
  }
}
</style>