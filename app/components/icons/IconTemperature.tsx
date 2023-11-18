import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

export function IconTemperature(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 -960 960 960"
      width="20"
      {...props}
    >
      <path
        fill="currentColor"
        d="M479.774-136q-63.62 0-107.697-44.237Q328-224.474 328-288q0-40.453 18.384-74.419 18.385-33.966 53.616-53.043V-744q0-33.846 23.077-56.923Q446.154-824 480-824q33.846 0 56.923 23.077Q560-777.846 560-744v328.538q34.231 19.077 53.116 53.577Q632-327.385 632-288q0 63.526-44.303 107.763T479.774-136ZM432-512.615h96v-68h-48v-38.77h48v-57.23h-48v-38.77h48V-744q0-20.4-13.8-34.2Q500.4-792 480-792q-20.4 0-34.2 13.8Q432-764.4 432-744v231.385Z"
      />
    </svg>
  );
}
