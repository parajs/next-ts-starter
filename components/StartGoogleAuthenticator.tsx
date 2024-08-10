import authenticator from "@/assets/images/google-authenticator.png";
import React, { useState } from "react";
import { Button } from "antd";
import BindAuthenticator from "@/components/BindAuthenticator";

const StartGoogleAuthenticator = () => {
  console.log("StartGoogleAuthenticator");
  const [open, setOpen] = useState(false);
  return (
    <>
      {open ? (
        <BindAuthenticator />
      ) : (
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-1">
            你还没有绑定Google Authenticator，请先绑定
            <img src={authenticator.src} />
          </div>
          <Button
            onClick={() => setOpen(true)}
            style={{
              borderRadius: "40px",
              height: 44,
            }}
            type="primary"
            htmlType="submit"
          >
            启用Google Authenticator
          </Button>
        </div>
      )}
    </>
  );
};

export default StartGoogleAuthenticator;
