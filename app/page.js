"use client"

import MainContent from "@/components/MainContent";
import Sale from "@/components/Sale";
import Toolbar from "@/components/Toolbar";
import Image from "next/image";
import { useState } from "react";

export default function Page() {

  const [isSale, setIsSale] = useState(true);

  return (
    <div>
     
      <MainContent/>
    </div>
  );
}
