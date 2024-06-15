export function Icon03n({size}: {size:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <linearGradient id="03n-cloud" x1="20" y1="20" x2="40" y2="55" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#c7d2fe" />
        <stop offset="1" stopColor="#818cf8" />
      </linearGradient>
      <path stroke="url(#03n-cloud)" strokeWidth="2" d="M15.8696 45.0048C9.86647 45.0048 5 40.1383 5 34.1352C5 28.1321 9.86647 23.2657 15.8696 23.2657C16.3512 23.2657 16.8255 23.297 17.2906 23.3577C19.7139 18.1669 24.9804 14.57 31.087 14.57C38.7537 14.57 45.0962 20.2396 46.1504 27.6148C46.2016 27.6139 46.2529 27.6135 46.3043 27.6135C51.1068 27.6135 55 31.5067 55 36.3091C55 41.1116 51.1068 45.0048 46.3043 45.0048H15.8696Z"/>
    </svg>
  );
}
