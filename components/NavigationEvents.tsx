"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store";

const whiteList: string[] = ["/"];

function NavigationEvents({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const token = useUserStore((state) => state.user?.token);
  const router = useRouter();

  // 路由变化前的处理函数
  function handleRouteChange() {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    const isInWiteList = whiteList.includes(pathname);
    // 未登录
    if (token) {
      if (pathname == "/") {
        router.push("/sys/walletList");
      }
    } else {
      if (!isInWiteList) router.push("/");
    }
  }

  // if (typeof window != undefined) handleRouteChange();

  useEffect(handleRouteChange, [pathname, router, searchParams, token]);

  return children;
}

export default NavigationEvents;
