import { Link } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Button,
  Group,
  Menu,
  Title,
} from '@mantine/core';
import { User } from 'modules/auth/types/user';

interface HeaderProps {
  dark?: boolean;
  opened?: boolean;
  user?: User | null;
  onLogout?: () => void;
  toggle?: () => void;
}

const Header = ({
  opened = false,
  toggle,
  user = null,
  onLogout,
}: HeaderProps) => {
  return (
    <AppShell.Header>
      <Group
        h="100%"
        justify="space-between"
        px="md"
      >
        <Group
          align="center"
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Title order={3}>RPG Campaign Manager</Title>
        </Group>

        <Group
          align="center"
          gap="sm"
        >
          { user ? (
            <Group>
              <Menu>
                <Menu.Target>
                  <Button>
                    {user.username}
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>{user.username}</Menu.Label>
                  <Menu.Item color="red" onClick={onLogout}>
                    Выйти
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          ) : (
            <Group>
              <Link to="/login">
                Войти
              </Link>
              <Link to="/register">
                Зарегистрироваться
              </Link>
            </Group>
          )}
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default Header;
