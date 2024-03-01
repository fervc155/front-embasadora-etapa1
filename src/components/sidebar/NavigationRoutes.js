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
          meta:{
            icon:'vuestic-iconset-forms'
          }
        },
        {
          name: 'cotizaciones',
          auth:['senior','hostess'],
          displayName: 'Cotizaciones',          
          meta:{
            icon:'vuestic-iconset-files'
          }
        },        
        {
          name: 'citas',
          auth:['senior','clouser','hostess'],
          displayName: 'Citas',          
          meta:{
            icon:'fa fa-calendar va-icon fa fa-calendar'
          }
        },
       {
          name: 'primer-reporte',
          auth:['senior','clouser','hostess'],
          displayName: 'Reporte',          
          meta:{
            icon:'fa fa-bar-chart va-icon fa fa-bar-chart'
          }
        },
      ],
    },
    {
      name: 'clientes',
      auth:['senior','hostess','clouser'],
      displayName: 'Clientes',
      meta: {
        icon: 'fa fa-address-book-o va-icon fa fa-address-book-o',
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
