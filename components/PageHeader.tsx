"use client";

import { Avatar, Dropdown } from "antd";
import styled from "styled-components";
import type { MenuProps } from "antd";
import AvatarImg from "@/assets/images/avatar-img.png";
import { useUserStore } from "@/store";
import { authLogout } from "@/api";
import { useRouter } from "next/navigation";
import { removeLocalStorage } from "@/utils/localStorage";
import { useEffect, useState } from "react";

const S = {
  HeadContainer: styled.header`
    position: fixed;
    z-index: 200;
    left: 0;
    top: 0;
    right: 0;
    display: flex;
    min-height: 50px;
    padding: 0 32px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    background: linear-gradient(180deg, #fff 80.5%, #f6f9fc 100%);
  `,
  Title: styled.div`
    color: #030316;
    font-size: 20px;
    font-weight: 500;
  `,
  AvatarEmailInfo: styled.div`
    display: flex;
    height: 34px;
    padding: 12px 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    border-bottom: 1px solid #5558ff;
    background: #fff;
    cursor: pointer;
  `,
};

const AvatarEmailDropdown = () => {
  const { user, reset } = useUserStore();
  const router = useRouter();
  const logout = async () => {
    await authLogout();
    removeLocalStorage("user");
    reset();
    router.push("/");
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className=" text-center text-[#5558FF] text-[14px]"
          onClick={logout}
        >
          退出
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      overlayStyle={{
        borderRadius: "8px",
        borderBottom: "1px solid #5558FF",
        background: "#FFF",
        boxShadow: "0px 4px 4px 0px rgba(85, 88, 255, 0.50)",
      }}
    >
      <S.AvatarEmailInfo>
        <Avatar size={24} src={AvatarImg.src} />
        <div className=" text-[#4D4D4D] text-[14px]">{user?.email}</div>
      </S.AvatarEmailInfo>
    </Dropdown>
  );
};

export default function PageHeader() {
  console.log("PageHeader");
  const { user } = useUserStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <S.HeadContainer>
      <div className="flex items-center">
        {/* <NextJsLogo height={40} fill={`rgb(244 244 245)`} /> */}
        <S.Title>钱包与任务管理系统</S.Title>
      </div>
      {/* 有水合错误 */}
      {isClient && user?.token ? <AvatarEmailDropdown /> : null}
    </S.HeadContainer>
  );
}
