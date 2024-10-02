type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  Trash2Icon: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  ),
  HeartIcon: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),

  FilePenIcon: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  ),
  Trash: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      shapeRendering="crispEdges"
      viewBox="0 -0.5 32 32"
    >
      <path
        stroke="gray"
        d="M4 0h20M4 1h1m8 0h2m9 0h2M4 2h1m7 0h1m2 0h1m11 0h1M2 3h3m6 0h1m4 0h1M1 4h1m2 0h1m5 0h1m6 0h1m10 0h1M1 5h1m1 0h2m4 0h1m18 0h1M1 6h1m6 0h1m17 0h2M1 7h1m5 0h1m16 0h2M1 8h1m19 0h3m4 0h1M2 9h1m18 0h1M2 10h1m18 0h1M2 11h1m18 0h1m5 0h2M2 12h1m21 0h5M3 13h1m17 0h7M3 14h1m15 0h9M3 15h1m15 0h9M3 16h1m15 0h9M4 17h1m14 0h8M4 18h1m14 0h8M4 19h1m14 0h8M4 20h1m14 0h8M5 21h1m9 0h1m3 0h7M5 22h1m13 0h7M5 23h1m13 0h7M5 24h3m11 0h7M8 25h2m9 0h6m-15 1h2m7 0h6m-13 1h2m5 0h6m-11 1h2m3 0h6m-9 1h2m1 0h4m-5 1h3"
      ></path>
      <path stroke="navy" d="M5 1h8M5 2h7"></path>
      <path
        stroke="#fff"
        d="M15 1h8M13 2h1m2 0h8M12 3h3m2 0h5m2 0h3M2 4h2m2 0h3m2 0h5m2 0h2m2 0h1m1 0h4M2 5h1m3 0h2m2 0h6m4 0h2m1 0h2m1 0h2M2 6h2m2 0h1m2 0h6m1 0h2m1 0h2m1 0h2m1 0h1M4 7h2m2 0h6m1 0h2m1 0h2m1 0h2m3 0h2M6 8h2m2 0h3m1 0h2m1 0h2m1 0h1m3 0h3M8 9h2m3 0h2m1 0h2m1 0h2m1 0h4m-16 1h2m3 0h2m1 0h2m2 0h2m3 0h2m-17 1h2m3 0h2m1 0h1m3 0h3m-13 1h2m5 0h3m-8 1h5"
      ></path>
      <path
        stroke="silver"
        d="M23 1h1M14 2h1M5 3h6m4 0h1m11 0h1M5 4h1m3 0h1m6 0h1M5 5h1m2 0h1m8 0h1M4 6h2m1 0h1m20 0h1M2 7h2m2 0h1m21 0h1M2 8h4m2 0h2m17 0h1M3 9h5m2 0h2m14 0h3M3 10h7m2 0h2m10 0h3M3 11h9m2 0h2m6 0h2M3 12h11m2 0h5M4 13h8m2 0h2M4 14h6m5 0h1m1 0h2M4 15h2m4 0h3m4 0h2M4 16h3m3 0h4m3 0h2M5 17h1m4 0h3m4 0h2M5 18h1m2 0h1m1 0h9M5 19h1m2 0h8m1 0h2M5 20h1m2 0h4m1 0h3m1 0h2M6 21h1m1 0h3m2 0h2m2 0h2M6 22h2m1 0h1m7 0h2M6 23h5m5 0h3M8 24h4m1 0h6m-9 1h9m-7 1h7m-5 1h5m-3 1h3m-1 1h1"
      ></path>
      <path
        stroke="#000"
        d="M24 2h3m-5 1h2m4 0h1m-9 1h2m7 0h1M18 5h2m9 0h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1m-2 1h1m-1 1h1m-1 1h1m-1 1h1m-2 1h1m-1 1h1m-1 1h1m-1 1h1m-2 1h1m-1 1h1m-1 1h1m-1 1h1M6 25h2m17 0h1M8 26h2m15 0h1m-16 1h2m13 0h1m-14 1h2m11 0h1m-12 1h2m7 0h2m-9 1h2m3 0h2m-5 1h3"
      ></path>
      <path
        stroke="#00f"
        d="M23 4h1m-8 1h1m5 0h1m2 0h1M15 6h1m2 0h1m2 0h1m2 0h1M14 7h1m2 0h1m2 0h1m2 0h1M13 8h1m2 0h1m2 0h1m-8 1h1m2 0h1m2 0h1m-5 1h1m2 0h1m2 0h1m-5 1h1m2 0h1"
      ></path>
      <path
        stroke="green"
        d="M12 13h2m-4 1h5m1 0h1M6 15h4m3 0h4M7 16h3m4 0h3M6 17h4m3 0h4M6 18h2m1 0h1m-4 1h2m8 0h1M6 20h2m4 0h1m3 0h1M7 21h1m3 0h2m3 0h1m-9 1h1m1 0h7m-6 1h5m-4 1h1"
      ></path>
    </svg>
  ),
  Pen: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      shapeRendering="crispEdges"
      viewBox="0 -0.5 16 16"
    >
      <path
        stroke="#000"
        d="M11 1h1m1 0h1m-4 1h1m3 0h1M9 3h1M8 4h1m5 0h1M7 5h1m5 0h1M6 6h1m5 0h1M5 7h1m5 0h1M4 8h1m5 0h1M3 9h1m5 0h1m-8 1h1m5 0h1m-8 1h2m4 0h1m-7 1h1m1 0h1m2 0h1m-6 1h1m2 0h2m-5 1h4"
      ></path>
      <path stroke="maroon" d="M12 1h1m-2 1h1m1 0h1m-2 1h1m1 0h1m-2 1h1"></path>
      <path stroke="red" d="M12 2h1m0 1h1"></path>
      <path
        stroke="olive"
        d="M10 3h2m-2 1h3m-2 1h2m-2 1h1m-2 1h1M9 8h1M8 9h1m-2 1h1m-2 1h1m-5 1h1m2 0h1m-4 1h2"
      ></path>
      <path
        stroke="#ff0"
        d="M9 4h1M8 5h2M7 6h2M6 7h2M5 8h2M4 9h2m-3 1h2m-2 1h1"
      ></path>
      <path
        stroke="silver"
        d="M10 5h1M9 6h1M8 7h1M7 8h1M6 9h1m-2 1h1m-2 1h1"
      ></path>
      <path
        stroke="gray"
        d="M10 6h1M9 7h1M8 8h1M7 9h1m-2 1h1m-2 1h1m-2 1h1"
      ></path>
    </svg>
  ),
  Star: (props: IconProps) => (
    <svg
      {...props}
      width="800px"
      height="800px"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M168.958 155.927C176.737 130.329 183.098 111.177 188.041 98.4702C195.455 79.4104 212.356 53.1502 212.356 60.1603C212.356 67.1705 239.365 153.837 243.921 155.927C248.477 158.016 327.888 156.593 326.992 160.124C326.097 163.655 327.188 164.541 317.314 170.331C310.732 174.19 287.62 191.086 247.979 221.017C245.644 221.991 245.882 224.949 248.692 229.891C252.907 237.304 265.034 277.871 269.41 290.528C273.786 303.186 282.717 337.149 278.251 340.628C273.786 344.108 252.431 322.129 247.979 317.222C243.527 312.314 212.356 253.79 204.271 253.79C196.186 253.79 178.108 279.57 174.148 284.216C170.187 288.862 128.921 336.672 114.124 338.65C99.3259 340.628 104.105 328.539 114.124 309.534C120.803 296.863 134.107 267.309 154.037 220.87C144.027 216.395 135.15 212.906 127.406 210.401C115.791 206.644 79.1085 194.473 73.9807 192.933C68.8528 191.392 84.9287 184.462 96.8396 177.396C108.751 170.331 135.032 160.124 149.953 160.124"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
