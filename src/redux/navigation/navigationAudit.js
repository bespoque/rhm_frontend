import { RhmDashboard, Collections } from '../../components/Icons/index';

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
        icon: <Collections />,
        title: 'Collections',
        items: [
          {
            title: 'View',
            url: '/reports',
            items: [],
          },
          {
            title: 'Manifest',
            url: '/reports-manifest',
            items: [],
          },
        ],
      },
    ],
  },
];

export default function navigationAudit(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
