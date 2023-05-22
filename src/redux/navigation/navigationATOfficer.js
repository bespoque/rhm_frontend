import { RhmDashboard, ManageTaxpayer, DirectAssessment, Paye, Collections, Settings } from '../../components/Icons/index';

// Added non individual navigation to side menu

const initialState = [
  {
    title: 'Applications',
    items: [
      {
        url: '/dashboard',
        icon: <RhmDashboard />,
        title: 'Dashboard',
        items: [],
      },

      {
        url: '/',
        icon: <ManageTaxpayer />,
        title: 'Manage Taxpayer',
        items: [
          {
            title: 'Individual',
            items: [
              { title: 'Create', url: '/taxpayer', items: [] },
              {
                title: 'View',
                url: '/reports-individual',
                items: [],
              },
            ],
          },
          {
            title: 'Non-Individual',
            items: [
              { title: 'Create', url: '/taxpayer/non-individual', items: [] },
              {
                title: 'View',
                url: '/reports-non-individual',
                items: [],
              },
            ],
          },
        ],
      },

      {
        url: '/',
        icon: <DirectAssessment />,
        title: 'Direct Assessment',
        items: [
          {
            title: 'Create',
            url: '/direct-asses',
            items: [],
          },
          {
            title: 'Draft Assessments',
            url: '/view/pendingdirect',
            items: [],
          },
          {
            title: 'Submitted Assessments',
            url: '/view/completeddirect',
            items: [],
          },
          {
            title: 'Approved Assessments',
            url: '/view/approvedasses',
            items: [],
          },
          {
            url: '/',
            title: 'Report',
            items: [
              {
                title: 'Assessment',
                url: '/assessment-report',
                items: [],
              },
              {
                title: 'Unassessed Collections',
                url: '/unassessed-report',
                items: [],
              },
            ],
          },
        ],
      },
      {
        url: '/',
        icon: <Collections />,
        title: 'Collections',
        items: [
          {
            title: 'View',
            url: '/reports',
            items: [],
          },
        ],
      },
      // {
      //   url: '/',
      //   icon: <Settings />,
      //   title: 'Access Management',
      //   items: [

      //     {
      //       title: 'Manage User',
      //       items: [
      //         { title: 'Create', url: '/register', items: [] },
      //         {
      //           title: 'View',
      //           url: '/view/users',
      //           items: [],
      //         },
      //       ],
      //     },
      //     {
      //       title: 'User Groups',
      //       items: [
      //         { title: 'Create', url: '/view/user-group/create', items: [] },
      //         {
      //           title: 'View',
      //           url: '/view/user-group/list',
      //           items: [],
      //         },
      //       ],
      //     },
      //     {
      //       title: 'APP Groups',
      //       items: [
      //         { title: 'Create', url: '/view/app-group/create', items: [] },
      //         {
      //           title: 'View',
      //           url: '/view/app-group/list',
      //           items: [],
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Permissions',
      //       items: [
      //         { title: 'Create', url: '/view/access-rights/create', items: [] },
      //         {
      //           title: 'View',
      //           url: '/view/access-rights/list',
      //           items: [],
      //         },
      //       ],
      //     },

      //   ],
      // },
    ],
  },
];

export default function navigationReport(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
