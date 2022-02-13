export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'Dashboard',
      auth:['senior','hostess','clouser'],
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'etapa-1',
      displayName: 'Etapa 1',
      auth:['senior','hostess','clouser'],
      meta: {
        icon: 'vuestic-iconset-statistics',
      },
      disabled: true,
      children: [
        {
          name: 'cuestionarios',
          auth:['senior','hostess','clouser'],
          displayName: 'Cuestionarios',
        },
        {
          name: 'cotizaciones',
          auth:['senior','hostess'],
          displayName: 'Cotizaciones',
        },
      ],
    },
    {
      name: 'clientes',
      auth:['senior','hostess','clouser'],
      displayName: 'Clientes',
      meta: {
        icon: 'vuestic-iconset-user',
      },
    },
    {
      name: 'usuarios',
      auth:['senior'],
      displayName: 'Usuarios',
      meta: {
        icon: 'vuestic-iconset-user',
      },
    },

  ],
}
