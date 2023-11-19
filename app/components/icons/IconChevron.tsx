interface Props extends React.SVGProps<SVGSVGElement> {}

export function IconChevron(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M531.692-480 361.846-649.846q-5.615-5.615-6-13.769-.385-8.154 6-14.539T376-684.539q7.769 0 14.154 6.385l175.538 175.539q5.231 5.23 7.347 10.692 2.115 5.461 2.115 11.923t-2.115 11.923q-2.116 5.462-7.347 10.692L390.154-281.846q-5.615 5.615-13.769 6-8.154.385-14.539-6T355.461-296q0-7.769 6.385-14.154L531.692-480Z"
      />
    </svg>
  );
}
