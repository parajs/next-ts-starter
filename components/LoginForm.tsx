"use client";

import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message, Modal } from "antd";
import styles from "./LoginForm.module.css";
import { useCallback, useEffect, useRef, useState } from "react";

import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useRequest } from "ahooks";
import { bindMachine, loginPass } from "@/api";
import { useUserStore } from "@/store";
import { setLocalStorage } from "@/utils/localStorage";
import { LoginPassParams } from "@/types";
import { useRouter } from "next/navigation";
type FieldType = {
  username: string;
  password: string;
};

export default function LoginForm() {
  console.log("LoginForm");
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { loading, runAsync } = useRequest(loginPass, { manual: true });
  const { loading: bindMachineLoading, runAsync: runAsyncBindMachine } =
    useRequest(bindMachine, { manual: true });

  const { setUser } = useUserStore();
  const [open, setOpen] = useState(false);

  const { setBind2fa } = useUserStore();

  const [g2FaCode, setG2FaCode] = useState("");
  const [isError, setError] = useState(false);

  const formData = useRef<LoginPassParams>({
    fingerprint: "",
    username: "",
    password: "",
    g2FaCode: "",
  });

  useEffect(() => {
    const getFinterprint = async () => {
      const fpPromise = await FingerprintJS.load();
      const { visitorId } = await fpPromise.get();
      console.log("fingerprint:", visitorId);
      formData.current.fingerprint = visitorId;
    };

    getFinterprint();
  }, []);

  // 登录
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    formData.current = { ...formData.current, ...values };
    formData.current.g2FaCode = "";
    setG2FaCode("");
    await loginSys();
    router.push("/sys/walletList");
  };

  const loginSys = async () => {
    try {
      formData.current.g2FaCode = g2FaCode;
      console.log("loginSys", formData.current);
      const user = await runAsync(formData.current);
      setUser(user);
      setLocalStorage("user", user);
    } catch (error) {
      //第一次登录需要在google anthenticator上绑定密钥
      // @ts-ignore
      if (error?.code == 30002) {
        // @ts-ignore
        const user = error?.data;
        if (user) {
          // setUser(user);
          setLocalStorage("user", user);
        }

        setBind2fa(false);
        return;
      }
      // @ts-ignore
      if (error?.code == 30001) {
        // 非常用IP登录,需要验证验证码
        setOpen(true);
        setVisible(false);
      }
    }
  };

  const joinCommonIp = async () => {
    await runAsyncBindMachine({ fingerprint: formData.current.fingerprint });
    setOpen(false);
    router.push("/sys/walletList");
  };

  const confirmVertificaition = async () => {
    await loginSys();
    setVisible(true);
    router.push("/sys/walletList");
  };

  const noJoin = () => {
    setOpen(false);
    router.push("/sys/walletList");
  };

  return (
    <>
      <Form
        variant="borderless"
        className={styles["form-box"]}
        requiredMark={false}
        size="large"
        name="basic"
        labelCol={{ span: 4 }}
        style={{ minWidth: 576, marginLeft: -30 }}
        onFinish={onFinish}
        labelAlign="right"
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "用户名不存在",
            },
          ]}
        >
          <Input
            style={{ borderBottom: " 1px solid #E7ECF1" }}
            placeholder="输入用户名"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label={<div>密&nbsp;&nbsp;&nbsp;&nbsp;码</div>}
          name="password"
          rules={[
            {
              required: true,
              message: "密码错误",
            },
          ]}
        >
          <Input.Password
            style={{ borderBottom: " 1px solid #E7ECF1" }}
            placeholder="输入密码"
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            loading={loading}
            style={{
              width: 252,
              marginTop: 42,
              borderRadius: "40px",
              height: 44,
            }}
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <Modal
        onCancel={() => setOpen(false)}
        footer={null}
        open={open}
        width={480}
      >
        <div className="flex gap-2 flex-col px-[10px] py-[60px] items-center text-[#222]">
          {visible ? (
            <div>
              <p className="text-center h-[88px] flex items-center justify-center">
                验证通过，是否加入常用IP
              </p>
              <div className="flex gap-2 mt-6">
                <Button
                  onClick={joinCommonIp}
                  size="large"
                  style={{
                    width: 150,
                    borderRadius: "40px",
                    height: 44,
                  }}
                  type="primary"
                >
                  加入
                </Button>
                <Button
                  loading={bindMachineLoading}
                  onClick={noJoin}
                  size="large"
                  style={{
                    width: 150,
                    borderRadius: "40px",
                    height: 44,
                  }}
                  type="primary"
                >
                  不加入
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p>非常用IP登录，请验证Google Authenticator</p>
              <Input
                autoFocus
                variant="borderless"
                style={{
                  borderBottom: " 1px solid #E7ECF1",
                  textAlign: "center",
                }}
                onBlur={() => setError(false)}
                onChange={(e) => setG2FaCode(e.target.value)}
                placeholder="输入Google Authenticator APP生成的6位验证码"
              />
              {isError ? (
                <div className="text-[#FF2424] text-[12px] mt-2">
                  验证码错误
                </div>
              ) : null}
              <Button
                loading={loading}
                onClick={confirmVertificaition}
                size="large"
                style={{
                  width: 195,
                  marginTop: 24,
                  borderRadius: "40px",
                  height: 44,
                }}
                type="primary"
              >
                确认
              </Button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
