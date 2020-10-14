<template>
  <div class="users-list-item">
    <template v-if="user">
      <span
        class="user-list-item__back"
        @click="$router.push({ name: 'UsersList' })"
      >
        <svg viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.18945 0.220703L0.689453 4.7207L0.302734 5.125L0.689453 5.5293L5.18945 10.0293L5.99805 9.2207L2.46484 5.6875H9.8125C10.3164 5.6875 10.7852 5.81641 11.2188 6.07422C11.6523 6.32031 11.9922 6.66016 12.2383 7.09375C12.4961 7.52734 12.625 7.99609 12.625 8.5V12.4375H13.75V8.5C13.75 7.79688 13.5684 7.14648 13.2051 6.54883C12.8535 5.93945 12.373 5.45898 11.7637 5.10742C11.166 4.74414 10.5156 4.5625 9.8125 4.5625H2.46484L5.99805 1.0293L5.18945 0.220703Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span class="user-list-item__name">{{ user.name }}</span>
      <div class="user-list-item__tasks" v-if="tasks">
        <div
          class="user-list-item__tasks-item"
          :class="{ 'user-list-item__tasks-item--success': task.completed }"
          v-for="(task, idx) in tasks"
          :key="task.id"
        >
          <span class="users-list__col users-list__col--idx">{{
            idx + 1
          }}</span>
          <span class="users-list__col users-list__col--content">{{
            task.title
          }}</span>
          <span class="users-list__col">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0.9375C6.67578 0.9375 5.44531 1.27148 4.30859 1.93945C3.20703 2.58398 2.33398 3.45703 1.68945 4.55859C1.02148 5.69531 0.6875 6.92578 0.6875 8.25C0.6875 9.57422 1.02148 10.8047 1.68945 11.9414C2.33398 13.043 3.20703 13.916 4.30859 14.5605C5.44531 15.2285 6.67578 15.5625 8 15.5625C9.32422 15.5625 10.5547 15.2285 11.6914 14.5605C12.793 13.916 13.666 13.043 14.3105 11.9414C14.9785 10.8047 15.3125 9.57422 15.3125 8.25C15.3125 7.38281 15.1836 6.61523 14.9258 5.94727L14.0117 6.84375C14.1289 7.3125 14.1875 7.78125 14.1875 8.25C14.1875 9.375 13.9062 10.418 13.3438 11.3789C12.8047 12.3164 12.0664 13.0547 11.1289 13.5938C10.168 14.1562 9.125 14.4375 8 14.4375C6.875 14.4375 5.83203 14.1562 4.87109 13.5938C3.93359 13.0547 3.19531 12.3164 2.65625 11.3789C2.09375 10.418 1.8125 9.375 1.8125 8.25C1.8125 7.125 2.09375 6.08203 2.65625 5.12109C3.19531 4.18359 3.93359 3.44531 4.87109 2.90625C5.83203 2.34375 6.875 2.0625 8 2.0625C8.83203 2.0625 9.62305 2.2207 10.373 2.53711C11.0879 2.83008 11.7207 3.25195 12.2715 3.80273L13.0625 3.01172C12.4062 2.35547 11.6387 1.8457 10.7598 1.48242C9.89258 1.11914 8.97266 0.9375 8 0.9375ZM14.3457 3.3457L8 9.69141L5.5918 7.2832L4.7832 8.0918L7.5957 10.9043L8 11.291L8.4043 10.9043L15.1543 4.1543L14.3457 3.3457Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </div>
      <todo-loader v-else />
    </template>
    <todo-loader v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ActionTypes } from "@/store/actions";
import { UserDTO } from "@/store/models/userDTO";
import { TaskDTO } from "@/store/models/taskDTO";
import TodoLoader from "@/components/loader.vue";

export default defineComponent({
  components: { TodoLoader },

  computed: {
    users() {
      return this.$store.getters["users"];
    },

    user(): UserDTO | null {
      const { users } = this;
      const userId = Number(this.$route.params.id);

      if (!users) {
        return {} as UserDTO;
      }

      return users.find((user: UserDTO) => user.id === userId) || null;
    },

    tasks(): TaskDTO[] | null {
      const { user } = this;

      return (user && this.$store.getters["tasks"](user.id)) || null;
    },
  },

  watch: {
    "$route.params": {
      immediate: true,
      deep: true,
      handler(newState) {
        const { id } = newState;

        if (!id) return;

        this.$store.dispatch(ActionTypes.GET_USER_TASKS, { userId: id });
      },
    },
  },
});
</script>

<style lang="scss">
.users-list-item {
  display: flex;
  flex-direction: column;

  .user-list-item__name {
    font-size: 16px;
    font-weight: 600;
  }

  .user-list-item__back {
    svg {
      width: 24px;
      height: 24px;
      cursor: pointer;
      margin: 15px 0;
      color: #9e4cf9;

      &:hover {
        color: #9349e6;
      }
    }
  }

  .user-list-item__tasks {
    margin-top: 20px;
    border: 1px solid black;
    padding: 15px;
    border-radius: 10px;
    background-color: white;

    .user-list-item__tasks-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 600px;
      margin-bottom: 10px;

      svg {
        width: 24px;
        height: 24px;
        display: none;
      }

      &.user-list-item__tasks-item--success {
        svg {
          width: 24px;
          height: 24px;
          color: #55bf16;
          display: block;
        }
      }

      .users-list__col {
        &.users-list__col--content {
          width: 200px;
          flex-grow: 1;
        }

        &.users-list__col--idx {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>