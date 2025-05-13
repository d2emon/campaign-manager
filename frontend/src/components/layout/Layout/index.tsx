import {
  AppShell,
  NavLink,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Columns } from 'react-feather';
import { useAuth } from 'modules/auth/contexts/AuthContext';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const [opened, { toggle }] = useDisclosure(false);

  const dark = false;
  const navItems = [
    {
      label: 'Dashboard',
      icon: <Columns />,
      href: '/dashboard',
    },
    {
      label: 'Campaigns',
      icon: <Columns />,
      href: '/campaigns',
    },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <Header
        dark={dark}
        opened={opened}
        user={user}
        onLogout={logout}
        toggle={toggle}
      />
      <AppShell.Navbar
        p="md"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            label={item.label}
            leftSection={item.icon}
            href={item.href}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main className="bg-gray-50">
        {children}
      </AppShell.Main>
    </AppShell>
  )
}

export default Layout;
