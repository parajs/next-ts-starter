"use client";
import StartGoogleAuthenticator from "@/components/StartGoogleAuthenticator";
import LoginForm from "@/components/LoginForm";
import styled from "styled-components";
import { useUserStore } from "@/store";

const S = {
  LoginContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `,
  LoginBox: styled.div`
    display: flex;
    width: 56%;
    min-height: 576px;
    min-width: 800px;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* gap: 37px; */
    flex-shrink: 0;
    border-radius: 20px;
    background: #fff;
    backdrop-filter: blur(51.70000076293945px);
  `,
};

export default function Login() {
  const { isBind2fa } = useUserStore();
  return (
    <S.LoginContainer>
      <S.LoginBox>
        {isBind2fa ? <LoginForm /> : <StartGoogleAuthenticator />}
      </S.LoginBox>
    </S.LoginContainer>
  );
}
