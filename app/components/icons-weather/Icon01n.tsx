export function Icon01n({size}: {size:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <linearGradient id="01n-moon" x1="20" y1="10" x2="40" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#e7e5e4" />
        <stop offset="1" stopColor="#78716c" />
      </linearGradient>
      <path stroke="url(#01n-moon)" strokeWidth="2" d="M18.9782 32.9887C26.1637 32.9887 31.9887 27.1637 31.9887 19.9782C31.9887 17.4105 31.2449 15.0165 29.9609 13C38.9038 13.5051 46 20.917 46 29.9863C46 39.3827 38.3827 47 28.9863 47C19.917 47 12.5051 39.9038 12 30.9609C14.0165 32.2449 16.4105 32.9887 18.9782 32.9887Z"/>
    </svg>
  );
}
