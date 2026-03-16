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
          variant="subtle"
          color={isActive ? ACCENT_COLOR : "gray"}
          size="sm"
          style={{
            fontWeight: isActive ? 600 : 400,
            borderBottom: isActive
              ? `2px solid ${ACCENT_COLOR}`
              : "2px solid transparent",
            borderRadius: 0,
            transition: "all 0.2s ease",
            paddingBottom: "6px",
          }}
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
        color: isActive ? ACCENT_COLOR : "rgba(255,255,255,0.5)",
        padding: "10px",
        transition: "color 0.2s ease",
        display: "flex",
        alignItems: "center",
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
        bottom: 16,
        left: 16,
        right: 16,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 20px",
        background: "rgba(30, 26, 24, 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "40px",
        border: "0.5px solid rgba(255, 255, 255, 0.12)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        zIndex: 100,
      }}
    >
      <Group justify="center" h="100%" gap="xs">
        <NavIconItem to="/movies" icon={<IconMovie size={26} stroke={1.5} />} />
        <NavIconItem
          to="/tv"
          icon={<IconDeviceTvOld size={26} stroke={1.5} />}
        />
        <ActionIcon
          onClick={onAddClick}
          variant="filled"
          color={ACCENT_COLOR}
          size="xl"
          radius="xl"
          style={{
            boxShadow: `0 4px 16px ${ACCENT_COLOR}66`,
          }}
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
    <AppShellHeader
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(26, 24, 23, 0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          height: "100%",
          padding: "0 24px",
        }}
      >
        <Group align="center" gap="xs">
          <Logo size="sm" />
          <Text fw={700} size="lg" style={{ letterSpacing: "-0.3px" }}>
            My<span style={{ color: ACCENT_COLOR }}>Pile</span>
          </Text>
        </Group>
        <Group gap={4} align="center">
          <NavItem to="/movies" label="Movies" />
          <NavItem to="/tv" label="TV" />
          <Button
            onClick={onAddClick}
            variant="filled"
            color={ACCENT_COLOR}
            size="sm"
            radius="xl"
            leftSection={<IconPlus size={14} />}
            style={{
              marginLeft: "8px",
              marginRight: "8px",
              boxShadow: `0 4px 16px ${ACCENT_COLOR}44`,
            }}
          >
            Add to Pile
          </Button>
          <NavItem to="/games" label="Games" />
          <NavItem to="/books" label="Books" />
        </Group>
        <div />
      </div>
    </AppShellHeader>
  );
}
