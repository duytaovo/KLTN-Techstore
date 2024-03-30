import { useState } from "react";
import { useEffect } from "react";

import QuickFilter from "./QuickFilter";
import QuickLinkPc from "./QuickLinkPc";

interface Props {
  title: string;
  slug: { slug: string };
  name: string;
}
function Pc({ title, slug, name }: Props) {
  useEffect(() => {
    document.title = title;

    // Đổi màu nền
    document.body.style.backgroundColor = "white";
  }, []);
  const images: string[] = [
    "https://cdn.tgdd.vn/2022/07/banner/mayinhp-800-200-800x200.png",
    "https://cdn.tgdd.vn/2022/03/banner/aiohp-800-200-800x200.png",
    "https://cdn.tgdd.vn/2022/06/banner/800-200-800x200-169.png",
    "https://cdn.tgdd.vn/2022/06/banner/800-200-800x200-170.png",
    "https://cdn.tgdd.vn/2022/07/banner/800-200-800x200-15.png",
    "https://cdn.tgdd.vn/2022/07/banner/Layer-1-800x200.png",
    "https://cdn.tgdd.vn/2022/07/banner/800-200-800x200-72.png",
    "https://cdn.tgdd.vn/2022/07/banner/Layer-2-800x200.png",
  ];
  const Img = () => {
    return images.map((src, index) => {
      return (
        <a href="/#" key={index}>
          <img src={src} />
        </a>
      );
    });
  };
  const img1 = {
    img: "https://cdn.tgdd.vn/2022/05/banner/lenovo-may-tinh390-97-390x97.png",
    link: "/#",
  };
  const img2 = {
    img: "https://cdn.tgdd.vn/2022/06/banner/Xa-hang-Laptop-2-390x97-2.png",
    link: "/#",
  };
  const [chose, setChose] = useState("");
  const [isOpen, setisOpen] = useState(false);

  const handleSetChoose = (text: string) => {
    setChose(text);
  };
  return (
    <main className="w-[86%] max-w-[1200px] my-[1.6rem] mx-auto">
      <QuickFilter slug={slug} />
      <QuickLinkPc handleSetChose={handleSetChoose} />
    </main>
  );
}

export default Pc;
