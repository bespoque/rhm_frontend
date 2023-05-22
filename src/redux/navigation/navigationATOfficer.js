import { RhmDashboard, ManageTaxpayer, DirectAssessment, Collections, } from '../../components/Icons/index';

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
    ],
  },
];

export default function navigationATOfficer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
