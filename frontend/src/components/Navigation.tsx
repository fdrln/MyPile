import { AppShellHeader, Group, Text, ActionIcon, Button } from "@mantine/core";
import { NavLink } from "react-router-dom";
import {
  IconMovie,
  IconDeviceTvOld,
  IconDeviceGamepad2,
  IconBook,
  IconPlus,
} from "@tabler/icons-react";
import Logo from "./Logo";
import { ACCENT_COLOR } from "../constants/theme";

interface NavigationProps {
  isMobile: boolean;
  onAddClick: () => void;
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button
          variant={isActive ? "filled" : "subtle"}
          color={ACCENT_COLOR}
          size="sm"
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
      style={({ isActive }) => ({
        color: isActive ? ACCENT_COLOR : "gray",
        padding: "10px",
      })}
    >
      {icon}
    </NavLink>
  );
}

export default function Navigation({ isMobile, onAddClick }: NavigationProps) {
  return isMobile ? (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        left: 10,
        right: 10,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 16px",
        background: "var(--mantine-color-dark-6)",
        borderRadius: "40px",
      }}
    >
      <Group justify="center" h="100%">
        <NavIconItem to="/movies" icon={<IconMovie size={28} stroke={2} />} />
        <NavIconItem to="/tv" icon={<IconDeviceTvOld size={28} stroke={2} />} />
        <ActionIcon
          onClick={onAddClick}
          variant="filled"
          color={ACCENT_COLOR}
          size="xl"
          radius="xl"
        >
          <IconPlus size={24} />
        </ActionIcon>
        <NavIconItem
          to="/games"
          icon={<IconDeviceGamepad2 size={28} stroke={2} />}
        />
        <NavIconItem to="/books" icon={<IconBook size={28} stroke={2} />} />
      </Group>
    </div>
  ) : (
    <AppShellHeader>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          height: "100%",
          padding: "0 16px",
        }}
      >
        <Group align="center" gap="xs">
          <Logo size="sm" />
          <Text fw={700} size="xl">
            My<span style={{ color: "#FF6B6B" }}>Pile</span>
          </Text>
        </Group>
        <Group>
          <NavItem to="/movies" label="Movies" />
          <NavItem to="/tv" label="TV" />
          <Button
            onClick={onAddClick}
            variant="filled"
            color={ACCENT_COLOR}
            size="lg"
            radius="xl"
            leftSection={<IconPlus size={18} />}
          >
            Add to pile
          </Button>
          <NavItem to="/games" label="Games" />
          <NavItem to="/books" label="Books" />
        </Group>
      </div>
    </AppShellHeader>
  );
}
