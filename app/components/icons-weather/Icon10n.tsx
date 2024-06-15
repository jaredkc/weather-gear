export function Icon10n({size}: {size:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <linearGradient id="10n-moon" x1="5" y1="5" x2="28" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#e7e5e4" />
        <stop offset="1" stopColor="#78716c" />
      </linearGradient>
      <linearGradient id="10n-cloud" x1="20" y1="20" x2="40" y2="55" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#c7d2fe" />
        <stop offset="1" stopColor="#818cf8" />
      </linearGradient>
      <path stroke="url(#10n-moon)" strokeWidth="2" d="M17.9338 12.5153C17.9338 17.1647 14.1647 20.9338 9.51529 20.9338C7.85384 20.9338 6.30481 20.4526 5 19.6218C5.24251 23.9157 7.94591 27.5517 11.7223 29.1418C13.5458 27.2075 16.1319 26 19 26C19.4431 26 19.8795 26.0288 20.3074 26.0847C21.6838 23.1363 24.0573 20.7468 26.9943 19.35C26.9981 19.2308 27 19.1112 27 18.9911C27 13.1227 22.4084 8.32681 16.6218 8C17.4526 9.30481 17.9338 10.8538 17.9338 12.5153Z"/>
      <path stroke="url(#10n-cloud)" strokeWidth="2" strokeLinecap="round" d="M45 46H47C51.4183 46 55 42.4183 55 38C55 33.5817 51.4183 30 47 30C46.9527 30 46.9055 30.0004 46.8584 30.0012C45.8885 23.216 40.0534 18 33 18C27.3819 18 22.5368 21.3092 20.3074 26.0847C19.8795 26.0288 19.4431 26 19 26C13.4772 26 9 30.4772 9 36C9 41.5228 13.4772 46 19 46H21"/>
      <path stroke="white" strokeWidth="2" strokeLinecap="round" d="M33 51V54"/>
      <path stroke="white" strokeWidth="2" strokeLinecap="round" d="M40 48V51"/>
      <path stroke="white" strokeWidth="2" strokeLinecap="round" d="M26 48V51"/>
      <path stroke="white" strokeWidth="2" strokeLinecap="round" d="M40 37V43"/>
      <path stroke="white" strokeWidth="2" strokeLinecap="round" d="M33 40V46"/>
      <path stroke="white" strokeWidth="2" strokeLinecap="round" d="M26 37V43"/>
    </svg>
  );
}
