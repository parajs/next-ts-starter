"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store";

const whiteList: string[] = ["/"];

function NavigationEvents({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const token = useUserStore((state) => state.user?.token);
  const router = useRouter();
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    const isInWiteList = whiteList.includes(pathname);
    setClient(true);
    // 未登录
    if (token) {
      if (pathname == "/") {
        router.push("/sys/walletList");
      }
    } else {
      if (!isInWiteList) router.push("/");
    }
  }, [pathname, router, searchParams, token]);

  return <>{isClient ? children : null}</>;
}

export default NavigationEvents;
