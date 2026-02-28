import { NavLink, useNavigate } from "react-router";
import {
    Globe,
  LayoutDashboard,
  Package,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";
import logo from "../assets/Image.png";

const menuConfig = [
  {
    section: "MENU",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Overview", path: "/overview", icon: Globe },
      { name: "Users", path: "/users",icon: Users },
      { name: "Products", path: "/products", icon:Package },
      { name: "Analytics", path: "/analytics", icon: BarChart2 },
    ]
  },
  {
    section: "GENERAL",
    items: [
      { name: "Settings", path: "/settings", icon: Settings },
      { name: "Help", path: "/help", icon: HelpCircle },
      { name: "Logout", path: "/logout", icon: LogOut }
    ]
  }
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 h-screen bg-[#F7F7F7] rounded-2xl p-4 flex flex-col shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 flex items-center justify-center font-bold">
          <img src={logo} alt="logo" />
        </div>
        <span className="text-xl font-semibold text-gray-800">
          Donezo
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6">
        {menuConfig.map((group) => (
          <div key={group.section}>
            <p className="text-xs text-gray-400 font-semibold px-2 mb-2">
              {group.section}
            </p>

            <ul className="space-y-1">
              {group.items.map((item) => {
                const isLogout = item.name === "Logout";

                return (
                  <li key={item.name}>
                    <NavLink
                      to={isLogout ? "#" : item.path}
                      end
                      onClick={isLogout ? handleLogout : undefined}
                      className={({ isActive }) =>
                        `
                        flex items-center justify-between px-3 py-2 rounded-lg
                        transition-all duration-200 group
                        ${
                          isActive && !isLogout
                            ? "bg-green-900 text-white shadow"
                            : "text-gray-600 hover:bg-green-50 hover:text-green-900"
                        }
                        `
                      }
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          size={18}
                          className="transition-transform group-hover:scale-110"
                        />
                        <span className="text-sm font-medium">
                          {item.name}
                        </span>
                      </div>

                      {/* {item.badge && ( 
                         <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                           {item.badge}
                         </span>
                    )} */}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Download Card */}
      <div className="mt-6 bg-linear-to-br from-green-800 to-green-900 rounded-xl p-4 text-white">
        <p className="text-sm font-semibold">
          Download our Mobile App
        </p>
        <p className="text-xs text-green-100 mt-1">
          Get easy access anytime
        </p>
        <button className="mt-3 w-full bg-white text-green-900 text-sm font-semibold py-2 rounded-lg transition-transform hover:scale-[1.03]">
          Download
        </button>
      </div>
    </aside>
  );
}