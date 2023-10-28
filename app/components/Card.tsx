type Props = {
  children: React.ReactNode;
};

export const Card = ({ children }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {children}
    </div>
  );
};
