import * as React from "react"
import Svg, { Path, Ellipse } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

export function SwordBill() {
  return (
    <Svg
            viewBox="-50 -200 1080 1080" height={60} width={60}
        >
      <Path
        d="M286.76 300.52s121.21 33.32 179.35 9.14c0 0 135-26.94 165.55-26.02s76.86 17.4 76.86 17.4 103.47 18.2 124.16 28.03c20.69 9.82 0 34.68 0 34.68l-32.52 23.74-63.07 18.82s-31.53 15.05-135 10.65c0 0-43.36-11.77-135.99-15.46 0 0-103.14-15.35-123.51.31L0 458.12l41.06-12.43 225.99-49.72 3.94-4.14-5.42-8.29s-21.67-54.64 21.19-83.02z"
        fill="#de6439"
        stroke="#000"
        strokeMiterlimit={10}
      />
      <Path
        fill="#F4B764"
        stroke="#000000"
        stroke-width="0.5"
        stroke-miterlimit={10}
        d="M327.16 317.1s-25.06 62.54 8.17 85.89L0 458.12l41.06-12.43 225.99-49.72 3.94-4.14-6.86-12.57s-18.76-50.81 22.63-78.74l43.4 9.63-3 6.95z"
      />
      <Path
        d="M434.58 279.49s116.28-63.53 150.28-54.32c0 0 15.27-.46 38.92 38.67l7.88 19.8-55.08 6.12-56.73 9.7-39.78 7.47-8.52 1.66-36.97-29.1z"
        fill="#f6b865"
        stroke="#000"
        strokeWidth={0.75}
        strokeMiterlimit={10}
      />
      <Path
        fill="#F4B764"
        stroke="#000000"
        stroke-width="0.5"
        stroke-miterlimit={10}
        d="M616.88 387.68s-32.03-15.19 7.39-24.86c0 0 55.68-6.91 76.86 5.06 0 0 .99 15.65-18.23 15.19-19.21-.45-66.02 4.61-66.02 4.61z"
      />
      <Path
        fill="#eeb365"
        stroke="#000"
        strokeWidth={0.5}
        strokeMiterlimit={10}
        d="M517.85 458.12l76.86-40.51v-2.38l-50.3-7.88-38.88 16.24 53.7-3.68z"
      />
      <Ellipse
        cx={794.26}
        cy={342.33}
        rx={16.75}
        ry={14.5}
        fill="#ebeff9"
        stroke="#000"
        strokeMiterlimit={10}
      />
      <Ellipse
        cx={794.71}
        cy={342.14}
        rx={8.99}
        ry={8.4}
        stroke="#000"
        strokeMiterlimit={10}
      />
      <Path
        d="M736.12 387.68s-52.72-25.78-1.97-65.6"
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
      />
      <Path
        d="M326.18 327.83l58.63 5.91 129.09-19.72 59.62-11.51 51.24-8.75 43.36 6.75 26.11 4.76 17.85 3.31h14.66l12.98-1.77-31.21-5.78-39.26-11.52-37.6-5.88-93.62 12.43-71.94 13.59-18.2 5.43-26.97 3.13s-40.49 2.36-85.61-7.13l-5.17-.94-6.56 17.68h2.6z"
        fill="#ef774f"
        stroke="#000"
        strokeWidth={0.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M764.49 398.13l35.68-10.65 6.81-4.97 2.06-6.34-40.4 11.51-53.21 10.45-81.3 2.9-239.63-35.75-75.54 8.98 3.87 13.42 12.5 15.31 7.27-1.2 7.76-3.62 17.91-2.86 41.67.33 51.44 5.18 33.83 2.17 39.28 3.27 36.91 5.32 30.7 5.37s83.78 4.01 99.04-2.65c0 0 31.19-4.11 61.41-15.59"
        fill="#d75423"
        stroke="#000"
        strokeWidth={0.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M454.29 279.03s83.27-37.29 106.43-36.83c0 0 26.1-3.23 47.79 0 0 0-9.41-16.49-23.64-17.03-14.24-.54-37.27 2.13-67.11 14.96-29.85 12.84-63.46 29.07-63.46 29.07l-19.71 10.29 7.72 6.08 11.98-6.54z"
        fill="#f8c37b"
        stroke="#000"
        strokeWidth={0.25}
        strokeMiterlimit={10}
      />
    </Svg>
  )
}