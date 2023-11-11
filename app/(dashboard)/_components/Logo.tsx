import React from "react";
import Image from "next/image";

import { LogoImage } from "@/public/images";
import Link from "next/link";

export const Logo = () => {
  return (
  <Link href="/">
    <Image
      src={LogoImage}
      alt="Logo Image"
      height={100}
      width={100}
    />
  </Link>
  )
}
