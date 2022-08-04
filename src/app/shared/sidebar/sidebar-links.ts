type NavLink = {
    text: string;
    icon: string;
    href: string;
    children?: NavLink[];
  };
  export const navLinks: NavLink[] = [
    {
      text: 'Dashboard',
      icon: 'home',
      href: '/dashboard',
    },
    {
      text: 'Marine Display',
      icon: 'sailing',
      href: '/marine-display',
    },
    {
      text: 'Analytics',
      icon: 'query_stats',
      href: '/analytics',
    },
    {
      text: 'Export Data',
      icon: 'file_download',
      href: '/',
    }
  ];
  