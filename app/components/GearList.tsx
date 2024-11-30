import type { Gear } from "~/gear";

interface Props {
  gear: Gear[];
}

export const GearList = ({ gear }: Props) => {
  return (
    <ul className="text-left divide-y divide-slate-800">
      {gear.map((item) => (
        <li key={item.id} className="flex justify-between px-4 py-3">
          {item.name}
          <span className="opacity-50">
            {item.min_temp}°&ndash;{item.max_temp}°
          </span>
        </li>
      ))}
    </ul>
  );
};
