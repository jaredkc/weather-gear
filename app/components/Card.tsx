type Props = {
  children: React.ReactNode;
};

export const Card = ({ children }: Props) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg text-slate-700">
      {children}
    </div>
  );
};
