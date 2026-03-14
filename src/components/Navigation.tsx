import { AppShellHeader, Group, Title } from "@mantine/core";
import { NavLink } from "react-router-dom";
import {
  IconMovie,
  IconDeviceTvOld,
  IconDeviceGamepad2,
  IconBook,
} from "@tabler/icons-react";
import React from "react";

interface NavigationProps {
  isMobile: boolean;
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        fontWeight: isActive ? "bold" : "normal",
        color: isActive ? "white" : "gray",
      })}
    >
      {label}
    </NavLink>
  );
}

function NavIconItem({ to, icon }: { to: string; icon: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? "#FF6B6B" : "gray",
      })}
    >
      {icon}
    </NavLink>
  );
}

export default function Navigation({ isMobile }: NavigationProps) {
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
        <NavIconItem to="/movies" icon={<IconMovie size={44} stroke={2} />} />
        <NavIconItem to="/tv" icon={<IconDeviceTvOld size={44} stroke={2} />} />
        <NavIconItem
          to="/games"
          icon={<IconDeviceGamepad2 size={44} stroke={2} />}
        />
        <NavIconItem to="/books" icon={<IconBook size={44} stroke={2} />} />
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
        <Title>MyPile</Title>
        <Group>
          <NavItem to="/movies" label="Movies" />
          <NavItem to="/tv" label="TV" />
          <NavItem to="/games" label="Games" />
          <NavItem to="/books" label="Books" />
        </Group>
        <div />
      </div>
    </AppShellHeader>
  );
}
