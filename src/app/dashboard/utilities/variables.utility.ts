import { MenuItem } from 'primeng/api';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    routerLink: ['/', 'dashboard', 'welcome'],
    routerLinkActiveOptions: { exact: true }
  },
  {
    label: 'Links',
    icon: 'pi pi-link',
    routerLink: ['/', 'dashboard', 'links'],
    routerLinkActiveOptions: { exact: true }
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    routerLink: ['/', 'dashboard', 'profile'],
    routerLinkActiveOptions: { exact: true }
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out'
  }
];
