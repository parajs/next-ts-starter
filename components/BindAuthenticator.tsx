import React, { useCallback, useState } from "react";
import { Form, Input, Button, QRCode, Typography, Space, Steps } from "antd";
import authenticator from "@/assets/images/google-authenticator.png";
import success from "@/assets/images/success.png";
import styles from "./BindAuthenticator.module.css";
import { bind2fa, postBind2fa } from "@/api";
import { useRequest } from "ahooks";
import { useRouter } from "next/navigation";
const { Paragraph } = Typography;

const steps = [
  {
    title: "生成密钥",
  },
  {
    title: "验证码验证",
  },
  {
    title: "绑定成功",
  },
];

const BindAuthenticator = () => {
  const [current, setCurrent] = useState(0);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const { data } = useRequest(bind2fa);
  const { runAsync } = useRequest(postBind2fa, { manual: true });
  const [g2FaCode, setG2FaCode] = useState("");
  const [isError, setError] = useState(false);
  const router = useRouter();

  const confirm = async () => {
    if (g2FaCode) {
      try {
        await runAsync({ g2FaCode });
        next();
      } catch (error) {
        setError(true);
      }
    } else {
      setError(true);
    }
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const renderStepsContent = () => {
    if (current == 0) {
      return (
        <>
          <div className="text-[#222] mb-6">
            1.打开Google
            Authenticator，点击右下角【+】，选择【扫描二维码】或【输入设置密钥】，输入下方密钥
          </div>

          <div className="flex gap-[10px] mb-[24px] items-center">
            密 钥
            <Paragraph
              className={styles.key}
              copyable
              style={{
                marginBottom: 0,
                gap: 30,
                display: "flex",
                padding: "0 14px",
                height: 38,
                lineHeight: "38px",
                color: "#999",
                borderRadius: 8,
                borderBottom: "1px solid #E7ECF1",
              }}
            >
              {data?.base32}
            </Paragraph>
          </div>

          <div className="flex flex-col items-center">
            {data?.base32 ? (
              <QRCode value={data?.base32} size={100} bordered={false} />
            ) : (
              <div
                style={{ width: 100, height: 100, background: "#D9D9D9" }}
              ></div>
            )}

            <div className="text-[#FF6251] text-[12px] font-medium mt-2">
              温馨提示：请使用离线存储的方式妥善保管该密钥
            </div>
          </div>
          <div className="flex flex-col items-center mt-9">
            <Button
              onClick={next}
              type="primary"
              htmlType="submit"
              style={{
                width: 150,
                borderRadius: "44px",
                height: 44,
              }}
            >
              下一步
            </Button>
          </div>
        </>
      );
    }

    if (current == 1) {
      return (
        <div className="flex flex-col items-center">
          <div className="mb-2 text-[#222]">Google Authenticator 验证码</div>
          <Input
            size="large"
            variant="borderless"
            maxLength={6}
            value={g2FaCode}
            style={{
              borderBottom: " 1px solid #E7ECF1",
              width: 350,
              textAlign: "center",
              letterSpacing: 12,
            }}
            onBlur={() => setError(false)}
            onChange={(e) => setG2FaCode(e.target.value)}
            placeholder="请输入密钥"
          />
          {isError ? (
            <div className="text-[#FF2424] text-[12px] mt-2">验证码错误</div>
          ) : null}

          <div className="flex flex-col items-center mt-9">
            <Space>
              <Button
                onClick={prev}
                type="primary"
                htmlType="submit"
                style={{
                  width: 150,
                  borderRadius: "44px",
                  height: 44,
                }}
              >
                上一步
              </Button>
              <Button
                disabled={!g2FaCode}
                onClick={confirm}
                type="primary"
                htmlType="submit"
                style={{
                  width: 150,
                  borderRadius: "44px",
                  height: 44,
                }}
              >
                确认
              </Button>
            </Space>
          </div>
        </div>
      );
    }

    if (current == 2) {
      return (
        <div className="flex flex-col items-center ">
          <img src={success.src} alt="" width={56} height={56} />
          <div className="mt-6 mb-9">Google Authenticator绑定成功</div>
          <Button
            onClick={() => router.push("/sys/walletList")}
            type="primary"
            htmlType="submit"
            style={{
              width: 150,
              borderRadius: "44px",
              height: 44,
            }}
          >
            进入系统
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1 text-[#030316] font-medium mb-9">
        绑定Google Authenticator
        <img src={authenticator.src} />
      </div>
      <div className="mb-9">
        <Steps
          className={styles["step-box"]}
          style={{ width: 500 }}
          current={current}
          items={items}
        />
      </div>

      {renderStepsContent()}
    </div>
  );
};

export default BindAuthenticator;
