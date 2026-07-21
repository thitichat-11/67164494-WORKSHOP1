import { NavLink } from "react-router-dom";

const TabNavigation = ({
  items,
  activeTo,
  onTabClick,
  activeBg = "#1A1714",
  activeText = "#ffffff",
  activeBorder,
  rounded = "rounded-full",
  padding = "py-1.5",
}) => {
  const resolvedActiveBorder = activeBorder ?? activeBg;
  const baseBtn = `px-5 ${padding} ${rounded} text-sm border transition-colors`;

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {items.map((item) => {
        const isActive = activeTo ? item.to === activeTo : false;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onTabClick}
            className={({ isActive: routerActive }) => {
              const selected = activeTo ? isActive : routerActive;
              return selected
                ? `${baseBtn} text-white border transition-colors`
                : `${baseBtn} bg-white text-black border-gray-200`;
            }}
            style={({ isActive: routerActive }) => {
              const selected = activeTo ? isActive : routerActive;
              if (!selected) return undefined;
              return {
                backgroundColor: activeBg,
                color: activeText,
                borderColor: resolvedActiveBorder,
              };
            }}
          >
            {item.label}
          </NavLink>
        );
      })}
    </div>
  );
};

export default TabNavigation;
