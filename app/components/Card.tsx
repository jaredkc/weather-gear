type Props = {
  children: React.ReactNode;
  highlight?: boolean;
};

export const Card = ({ children, highlight }: Props) => {
  return (
    <div className="relative" data-component="Card">
      {highlight && (
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400 via-70% to-transparent opacity-50" />
      )}
      <div className="bg-slate-900 bg-opacity-50 rounded-lg border border-slate-800 focus-within:bg-opacity-100 focus-within:outline focus-within:outline-cyan-800">
        {children}
      </div>
    </div>
  );
};
