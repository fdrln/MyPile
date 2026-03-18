import { AppShellHeader, Group, Text, ActionIcon, Button } from "@mantine/core";
import { NavLink } from "react-router-dom";
import {
  IconMovie,
  IconDeviceTvOld,
  IconDeviceGamepad2,
  IconBook,
  IconPlus,
  IconInfoCircle,
} from "@tabler/icons-react";
import Logo from "./Logo";
import { ACCENT_COLOR } from "../constants/theme";
import styles from "./Navigation.module.css";

interface NavigationProps {
  isMobile: boolean;
  onActionClick: () => void;
  onAboutClick: () => void;
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button
          variant="subtle"
          color={isActive ? ACCENT_COLOR : "gray"}
          size="sm"
          fw={isActive ? 600 : 400}
          className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
        >
          {label}
        </Button>
      )}
    </NavLink>
  );
}

function NavIconItem({ to, icon }: { to: string; icon: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => styles.navIconLink}
      style={({ isActive }) => ({
        color: isActive ? ACCENT_COLOR : "rgba(255,255,255,0.5)",
      })}
    >
      {icon}
    </NavLink>
  );
}

export default function Navigation({
  isMobile,
  onActionClick,
  onAboutClick,
}: NavigationProps) {
  return isMobile ? (
    <div className={styles.pill}>
      <Group justify="center" h="100%" gap="xs">
        <NavIconItem to="/movies" icon={<IconMovie size={26} stroke={1.5} />} />
        <NavIconItem
          to="/tv"
          icon={<IconDeviceTvOld size={26} stroke={1.5} />}
        />
        <ActionIcon
          onClick={onActionClick}
          variant="filled"
          color={ACCENT_COLOR}
          size="xl"
          radius="xl"
          style={{ boxShadow: `0 4px 16px ${ACCENT_COLOR}66` }}
        >
          <IconPlus size={22} stroke={2} />
        </ActionIcon>
        <NavIconItem
          to="/games"
          icon={<IconDeviceGamepad2 size={26} stroke={1.5} />}
        />
        <NavIconItem to="/books" icon={<IconBook size={26} stroke={1.5} />} />
      </Group>
    </div>
  ) : (
    <AppShellHeader className={styles.header}>
      <div className={styles.headerGrid}>
        <Group align="center" gap="xs">
          <Logo size="sm" />
          <Text fw={700} size="lg" className={styles.appName}>
            My<span style={{ color: ACCENT_COLOR }}>Pile</span>
          </Text>
        </Group>
        <Group gap={4} align="center">
          <NavItem to="/movies" label="Movies" />
          <NavItem to="/tv" label="TV" />
          <Button
            onClick={onActionClick}
            variant="filled"
            color={ACCENT_COLOR}
            size="sm"
            radius="xl"
            leftSection={<IconPlus size={14} />}
            className={styles.addButton}
            style={{ boxShadow: `0 4px 16px ${ACCENT_COLOR}44` }}
          >
            Add to Pile
          </Button>
          <NavItem to="/games" label="Games" />
          <NavItem to="/books" label="Books" />
        </Group>
        <Group justify="flex-end" gap="xs">
          <Button
            onClick={onAboutClick}
            variant="filled"
            color={ACCENT_COLOR}
            size="sm"
            radius="xl"
            leftSection={<IconInfoCircle size={14} />}
            style={{ boxShadow: `0 4px 16px ${ACCENT_COLOR}44` }}
          >
            About
          </Button>
        </Group>
      </div>
    </AppShellHeader>
  );
}
