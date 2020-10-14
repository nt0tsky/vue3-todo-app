import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/views/UsersListDetails.vue"),
        children: [
            {
                path: "",
                name: "UsersList",
                component: () => import("@/views/UsersListDetails/index.vue")
            },
            {
                path: ":id",
                name: "UsersListItem",
                component: () => import("@/views/UsersListDetails/item.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;