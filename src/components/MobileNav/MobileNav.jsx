import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Radio, User, Heart, PartyPopper } from "lucide-react";
import { djData } from "../../data/djData";
import "./MobileNav.css";

const ICONS = { Radio, User, Heart, PartyPopper };

export default function MobileNav() {
  return (
    <nav className="mobile-tabbar" aria-label="Navegação entre modalidades">
      <ul>
        {djData.mobileNav.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.path}>
              <NavLink to={item.path} end={item.path === "/"} className={({ isActive }) => `mobile-tabbar__link ${isActive ? "is-active" : ""}`}>
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span layoutId="tabbar-pill" className="mobile-tabbar__pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <Icon size={19} aria-hidden="true" className="mobile-tabbar__icon" />
                    <span className="mobile-tabbar__label">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
