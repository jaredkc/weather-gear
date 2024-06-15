export function Icon02d({size}: {size:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <linearGradient id="02d-sun" x1="5" y1="5" x2="40" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fbbf24" />
        <stop offset="1" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="02d-cloud" x1="20" y1="20" x2="40" y2="55" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f0f9ff" />
        <stop offset="1" stopColor="#bae6fd" />
      </linearGradient>
      <path stroke="url(#02d-sun)" strokeWidth="2" strokeLinecap="round" d="M34.435 13.565L30.1924 17.8076"/>
      <path stroke="url(#02d-sun)" strokeWidth="2" strokeLinecap="round" d="M21 8L21 14"/>
      <path stroke="url(#02d-sun)" strokeWidth="2" strokeLinecap="round" d="M7.56497 13.565L11.8076 17.8076"/>
      <path stroke="url(#02d-sun)" strokeWidth="2" strokeLinecap="round" d="M2 27L8 27"/>
      <path stroke="url(#02d-sun)" strokeWidth="2" d="M29.3638 23.6697C28.0398 20.3477 24.7941 18 21 18C16.0294 18 12 22.0294 12 27C12 29.4539 12.9821 31.6784 14.5746 33.3019"/>
      <path stroke="url(#02d-cloud)" strokeWidth="2" d="M22 50C16.4772 50 12 45.5228 12 40C12 34.4772 16.4772 30 22 30C22.4431 30 22.8795 30.0288 23.3074 30.0847C25.5368 25.3092 30.3819 22 36 22C43.0534 22 48.8885 27.216 49.8584 34.0012C49.9055 34.0004 49.9527 34 50 34C54.4183 34 58 37.5817 58 42C58 46.4183 54.4183 50 50 50H22Z"/>
    </svg>
  );
}
