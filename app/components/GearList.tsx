import type { Gear } from "~/gear";

interface Props {
  gear: Gear[];
}

export const GearList = ({ gear }: Props) => {
  return (
    <ul className="text-sm text-left divide-y divide-slate-800">
      {gear.map((item) => (
        <li key={item.id} className="px-4 py-3">
          {item.name}
        </li>
      ))}
    </ul>
  );
};
