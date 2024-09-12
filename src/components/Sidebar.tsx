import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ChevronLeft, Menu, MoreVertical } from "lucide-react";
import { useContext, createContext, useState, ReactNode, ComponentType, SVGProps } from "react";

// Contexto da Sidebar
const SidebarContext = createContext({ expanded: true });

// Propriedades da Sidebar
interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside>
      <nav className="fixed top-0 left-0 z-50 md:relative md:flex md:flex-col bg-white shadow-sm">
        <div className={`h-16 max-h-16 flex items-center px-3 border-b bg-gray-50 md:border-r md:border-b-transparent md:bg-transparent ${expanded ? "border-r bg-white border-b-transparent justify-between" : "justify-center"}`}>
          <span className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}>
            <img src="https://img.logoipsum.com/243.svg" alt="" />
          </span>
          <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100">
            {expanded ? <ChevronLeft /> : <Menu />}
          </button>
        </div>
        <div className={`h-[calc(100vh-64px)] border-r flex flex-col ${expanded ? "" : "hidden md:flex"}`}>
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 mx-3 pt-2">{children}</ul>
          </SidebarContext.Provider>

          <div className={`border-t flex p-3 ${!expanded && "justify-center"}`}>
            <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" alt="" className="w-10 h-10 rounded-full" />
            <div className={`flex flex-grow justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 hidden"}`}>
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">john@gmail.com</span>
              </div>
              <button
                onClick={() => {}}
                className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
              >
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

// Wrapper para o ícone
const IconWrapper: React.FC<{ icon: ComponentType<SVGProps<SVGSVGElement>>, size: number }> = ({ icon: Icon, size }) => {
  return <Icon width={size} height={size} />;
};

// Propriedades do Item da Sidebar
interface SidebarItemProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>; // Usar SVGProps para garantir compatibilidade
  sizeIcon: number;
  text: string;
  link: string | null;
  active: boolean;
  alert: boolean;
  subItems?: SidebarItemProps[]; // Tornar opcional e suportar até 3 níveis
}

// Exemplo de uso no SidebarItem
export function SidebarItem({
  icon: Icon,
  sizeIcon = 20,
  text,
  link,
  active = false,
  alert = false,
  subItems = [],
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => setIsSubmenuOpen((prev) => !prev);

  return (
    <li className="relative">
      <div
        className={`
          flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active
              ? "bg-indigo-200 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }
        `}
        onClick={subItems?.length ? toggleSubmenu : undefined}
      >
      {link ? (
        <Link to={link} className="flex items-center w-full">
          <IconWrapper icon={Icon} size={sizeIcon} />
          <span className={`overflow-hidden transition-all ${expanded ? "w-full ml-3" : "w-0"}`}>
            {text}
          </span>
        </Link>
      ) : (
        <span className="flex items-center w-full">
          <IconWrapper icon={Icon} size={sizeIcon} />
          <span className={`overflow-hidden transition-all ${expanded ? "w-full ml-3" : "w-0"}`}>
            {text}
          </span>
        </span>
        )}
        
        {subItems?.length > 0 && (
          <span className={`ml-auto ${!expanded && "hidden"}`}>
            {isSubmenuOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        )}

        {alert && (
          <div
            className={`absolute w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "right-5" : "right-2 top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-indigo-100 text-indigo-800 text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
          >
            {text}
          </div>
        )}
      </div>

      {/* Submenu */}
      {isSubmenuOpen && subItems?.length > 0 && (
        <ul className={`pl-8 transition-all ${expanded ? "block" : "hidden"}`}>
          {subItems.map((subItem, index) => (
            <SidebarItem
              key={index}
              icon={subItem.icon}
              sizeIcon={subItem.sizeIcon}
              text={subItem.text}
              link={subItem.link}
              active={subItem.active}
              alert={subItem.alert}
              subItems={subItem.subItems}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
