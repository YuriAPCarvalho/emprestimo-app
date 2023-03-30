export default [
    {
        route: {
            name: 'Clientes',
            path: '/clientes',
            meta: {
                requiresAuth: true,
                role: ['ADMIN']
            },
        },
        menu: {
            name: 'Clientes',
            icon: 'md-account',
            to: '/cliente'
        }

    }
]
