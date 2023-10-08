import type { Gear } from "~/gear/gear";

interface Props {
  gear: Gear[];
}

export const GearList = ({ gear }: Props) => {
  return (
    <ul className="list-disc w-48 mx-auto text-left">
      {gear.map((item) => (
        <li key={item.id} className="py-1">
          {item.name}
        </li>
      ))}
    </ul>
  );
};
