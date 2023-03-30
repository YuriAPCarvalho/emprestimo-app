<template>
    <v-navigation-drawer v-model="$store.state.drawer.active" app>
        <v-list-item>
            <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            drawer: null,
            items: [
                { title: 'Clientes', icon: 'mdi-account', to: '/dash/cliente' },
                { title: 'Vendedor', icon: 'mdi-account-group', to: '/dash/vendedor' },
                { title: 'Punições', icon: 'mdi-emoticon-sad-outline', to: '/dash/punicoes' },
                { title: 'Emprestimos', icon: 'mdi-cash-plus', to: '/dash/emprestimos' },
            ],
        }
    },
}
</script>
