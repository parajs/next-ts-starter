"use client";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

const S = {
  MenuNavContainer: styled.div`
    position: fixed;
    top: 60px;
    left: 10px;
    bottom: 10px;
    display: flex;
    width: 154px;
    padding: 24px 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex-shrink: 0;
    border-radius: 16px;
    background: #fff;
    font-size: 14px;
  `,
  ContentContainer: styled.div`
    margin-left: 180px;
  `,
  MenuItem: styled.div<{ $active: boolean }>`
    display: flex;
    text-align: center;
    margin-bottom: 12px;
    width: ${(props) => (props.$active ? "160px" : "150px")};
    color: ${(props) => (props.$active ? "white" : "#4d4d4d")};
    height: 44px;
    padding: 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    background: ${(props) => (props.$active ? "#5558FF" : "#fff")};
    box-shadow: ${(props) =>
      props.$active ? "none" : "0px 4px 4px 0px rgba(85, 102, 255, 0.1)"};
    cursor: pointer;
  `,
};

const MenuNav = () => {
  console.log("MenuNav");
  const router = useRouter();
  const pathName = usePathname();
  const menuList = [
    {
      name: "钱包列表",
      href: "/sys/walletList",
    },
    {
      name: "token余额展示管理",
      href: "/sys/tokenBalance",
    },
    {
      name: "任务列表",
      href: "/sys/taskList",
    },
  ];

  const navigateMenu = (item: (typeof menuList)[0]) => {
    router.replace(item.href);
  };

  return (
    <div>
      {menuList.map((item) => {
        return (
          <S.MenuItem
            key={item.href}
            $active={pathName == item.href}
            onClick={() => navigateMenu(item)}
          >
            {item.name}
          </S.MenuItem>
        );
      })}
    </div>
  );
};

export default function SysLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("SysLayout");
  return (
    <div>
      <S.MenuNavContainer>
        <MenuNav />
      </S.MenuNavContainer>
      <S.ContentContainer>{children}</S.ContentContainer>
    </div>
  );
}
