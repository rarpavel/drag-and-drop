import { useEffect, useState } from "react";

export const buttonType = {
  ok: "ok",
  cancel: "cancel",
  close: "close",
};

export default function Button({ type, action, children }) {
  const [className, setClassName] = useState("");

  const getStyle = (type) => {
    switch (type) {
      case buttonType.ok:
        return "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1";
      case buttonType.cancel:
        return "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1";
      case buttonType.close:
        return 'p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"';
      default:
        return "";
    }
  };

  useEffect(() => {
    if (type) {
      setClassName(getStyle(type));
    }
  }, [type]);

  return (
    <button className={className} type="button" onClick={action}>
      {children}
    </button>
  );
}
