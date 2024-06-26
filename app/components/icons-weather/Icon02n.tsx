export function Icon02n({size}: {size:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <linearGradient id="02n-moon" x1="5" y1="5" x2="28" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#e7e5e4" />
        <stop offset="1" stopColor="#78716c" />
      </linearGradient>
      <linearGradient id="02n-cloud" x1="20" y1="20" x2="40" y2="55" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#c7d2fe" />
        <stop offset="1" stopColor="#818cf8" />
      </linearGradient>
      <path stroke="url(#02n-moon)" strokeWidth="2" d="M17.9338 15.5153C17.9338 20.1647 14.1647 23.9338 9.51529 23.9338C7.85384 23.9338 6.30481 23.4526 5 22.6218C5.24251 26.9157 7.94591 30.5517 11.7223 32.1418C13.5458 30.2075 16.1319 29 19 29C19.4431 29 19.8795 29.0288 20.3074 29.0847C21.6838 26.1363 24.0573 23.7468 26.9943 22.35C26.9981 22.2308 27 22.1112 27 21.9911C27 16.1227 22.4084 11.3268 16.6218 11C17.4526 12.3048 17.9338 13.8538 17.9338 15.5153Z"/>
      <path stroke="url(#02n-cloud)" strokeWidth="2" d="M19 49C13.4772 49 9 44.5228 9 39C9 33.4772 13.4772 29 19 29C19.4431 29 19.8795 29.0288 20.3074 29.0847C22.5368 24.3092 27.3819 21 33 21C40.0534 21 45.8885 26.216 46.8584 33.0012C46.9055 33.0004 46.9527 33 47 33C51.4183 33 55 36.5817 55 41C55 45.4183 51.4183 49 47 49H19Z"/>
    </svg>
  );
}
