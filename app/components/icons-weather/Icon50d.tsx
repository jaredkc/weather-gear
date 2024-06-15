export function Icon50d({size}: {size:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <linearGradient id="50d-sun" x1="5" y1="5" x2="40" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fbbf24" />
        <stop offset="1" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="50d-cloud" x1="20" y1="20" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f0f9ff" />
        <stop offset="1" stopColor="#bae6fd" />
      </linearGradient>
      <path stroke="url(#50d-sun)" strokeWidth="2" strokeLinecap="round" d="M34.435 11.565L30.1924 15.8076"/>
      <path stroke="url(#50d-sun)" strokeWidth="2" strokeLinecap="round" d="M21 6L21 12"/>
      <path stroke="url(#50d-sun)" strokeWidth="2" strokeLinecap="round" d="M7.56497 11.565L11.8076 15.8076"/>
      <path stroke="url(#50d-sun)" strokeWidth="2" strokeLinecap="round" d="M2 25L8 25"/>
      <path stroke="url(#50d-sun)" strokeWidth="2" d="M29.3638 21.6697C28.0398 18.3477 24.7941 16 21 16C16.0294 16 12 20.0294 12 25C12 27.4539 12.9821 29.6784 14.5746 31.3019"/>
      <path stroke="url(#50d-cloud)" strokeWidth="2" strokeLinecap="round" d="M12.2 36C13.1266 31.4355 17.1621 28 22 28C22.4431 28 22.8795 28.0288 23.3074 28.0847C25.5368 23.3092 30.3819 20 36 20C43.0534 20 48.8885 25.216 49.8584 32.0012C49.9055 32.0004 49.9527 32 50 32C52.9611 32 55.5465 33.6088 56.9297 36"/>
      <path stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" d="M10 42H58M13 48H54M22 54H48"/>
    </svg>
  );
}
