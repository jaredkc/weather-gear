export function Icon01d({size}: {size:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <linearGradient id="01d-sun" x1="20" y1="10" x2="40" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fbbf24" />
        <stop offset="1" stopColor="#f97316" />
      </linearGradient>
      <path stroke="url(#01d-sun)" strokeWidth="2" strokeLinecap="round" d="M18.6863 18.6863L11.6152 11.6152"/>
      <path stroke="url(#01d-sun)" strokeWidth="2" strokeLinecap="round" d="M14 30L4 30"/>
      <path stroke="url(#01d-sun)" strokeWidth="2" strokeLinecap="round" d="M18.6863 41.3137L11.6152 48.3848"/>
      <path stroke="url(#01d-sun)" strokeWidth="2" strokeLinecap="round" d="M30 46V56"/>
      <path stroke="url(#01d-sun)" strokeWidth="2" strokeLinecap="round" d="M48.3848 48.3848L41.3137 41.3137"/>
      <path stroke="url(#01d-sun)" strokeWidth="2" strokeLinecap="round" d="M56 30L46 30"/>
      <path stroke="url(#01d-sun)" strokeWidth="2" strokeLinecap="round" d="M48.3848 11.6152L41.3137 18.6863"/>
      <path stroke="url(#01d-sun)" strokeWidth="2" strokeLinecap="round" d="M30 4V14"/>
      <circle stroke="url(#01d-sun)" strokeWidth="2" cx="30" cy="30" r="12"/>
    </svg>
  );
}
