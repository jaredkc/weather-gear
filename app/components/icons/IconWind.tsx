import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

export function IconWind(props: Props) {
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
        d="M456-158.616q-32.267 0-59.672-17.847-27.404-17.846-40.866-47.922-5.307-11.615 1.885-22.923 7.192-11.307 18.807-11.307 10.538 0 16.538 3.692t12.692 15.384q7.902 13.693 21.22 21.308 13.319 7.616 29.396 7.616 24.246 0 41.124-16.877 16.877-16.877 16.877-41.124 0-24.246-16.877-41.123-16.878-16.877-41.124-16.877H132q-11.069 0-18.534-7.405-7.465-7.405-7.465-18.384 0-10.98 7.465-18.595 7.465-7.615 18.534-7.615h324q45.769 0 77.884 32.115t32.115 77.884q0 45.769-32.115 77.884-32.115 32.116-77.884 32.116ZM132-557.385q-11.069 0-18.534-7.405-7.465-7.404-7.465-18.384 0-10.979 7.465-18.594 7.465-7.616 18.534-7.616h503.81q29.036 0 49.614-20.577 20.577-20.577 20.577-49.423 0-28.847-20.577-49.424-20.578-20.577-49.786-20.577-20.079 0-37.166 11.5-17.088 11.5-25.857 30.347-5.077 10.923-13.385 14.538-8.307 3.615-18.461 3.615-11.384 0-17.499-9.538-6.115-9.538-2.269-23.077 11-34.153 43.923-56.768 32.922-22.616 71.4-22.616 50.705 0 86.19 35.646 35.485 35.645 35.485 86.576 0 50.931-35.58 86.354T636-557.385H132Zm644.384 300.923Q762-252.77 751-259.77q-10.999-7-10.999-18.615 0-10.577 4.115-17.865 4.115-7.288 14.884-11.431 20-7.703 31.501-25.088 11.5-17.385 11.5-39.231 0-28.846-20.577-49.424-20.578-20.577-49.424-20.577H132q-11.069 0-18.534-7.404-7.465-7.405-7.465-18.384 0-10.98 7.465-18.595 7.465-7.615 18.534-7.615h600q50.839 0 86.419 35.58T853.999-372q0 41.307-20.961 73-20.962 31.692-56.654 42.538Z"
      />
    </svg>
  );
}
