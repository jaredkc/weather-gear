import type { Gear } from "~/gear";

interface Props {
  gear: Gear[];
}

export const GearList = ({ gear }: Props) => {
  return (
    <ul className="text-sm text-left divide-y">
      {gear.map((item) => (
        <li key={item.id} className="px-4 py-2">
          {item.name}
        </li>
      ))}
    </ul>
  );
};
