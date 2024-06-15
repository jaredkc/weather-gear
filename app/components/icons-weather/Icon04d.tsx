export function Icon04d({size}: {size:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <linearGradient id="04d-cloud" x1="20" y1="20" x2="40" y2="55" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f0f9ff" />
        <stop offset="1" stopColor="#bae6fd" />
      </linearGradient>
      <linearGradient id="04d-cloud2" x1="20" y1="20" x2="40" y2="55" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f0f9ff" />
        <stop offset="1" stopColor="#38bdf8" />
      </linearGradient>
      <path stroke="url(#04d-cloud2)" strokeWidth="2" d="M28.7918 17.022C35.4861 17.3953 40.925 22.4717 41.8584 29.0012C41.9055 29.0004 41.9527 29 42 29C46.4183 29 50 32.5817 50 37C50 37.319 49.9813 37.6337 49.945 37.9429C53.3611 37.5072 56 34.6288 56 31.1429C56 27.3558 52.8855 24.2857 49.0435 24.2857C49.0023 24.2857 48.9613 24.2861 48.9203 24.2868C48.0769 18.4709 43.0029 14 36.8696 14C33.77 14 30.941 15.1418 28.7918 17.022Z"/>
      <path stroke="url(#04d-cloud)" strokeWidth="2" d="M14 45C8.47715 45 4 40.5228 4 35C4 29.4772 8.47715 25 14 25C14.4431 25 14.8795 25.0288 15.3074 25.0847C17.5368 20.3092 22.3819 17 28 17C35.0534 17 40.8885 22.216 41.8584 29.0012C41.9055 29.0004 41.9527 29 42 29C46.4183 29 50 32.5817 50 37C50 41.4183 46.4183 45 42 45H14Z"/>
    </svg>
  );
}
