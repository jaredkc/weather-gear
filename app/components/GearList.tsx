import type { Gear } from "~/gear/gear";

interface Props {
  gear: Gear[];
}

export const GearList = ({ gear }: Props) => {
  return (
    <ul className="text-left border-t border-slate-300">
      {gear.map((item) => (
        <li key={item.id} className="py-2 border-b border-slate-300">
          {item.name}
        </li>
      ))}
    </ul>
  );
};
