import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { data } from "jquery";
import axios from "axios";

const PcContent = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/pc")
      .then((response) => response.data)
      .then((data) => setItems(data));
  }, []);
  return (
    <div className="text-gray-800 w-80">
      {items.map((item: any, index: number) => {
        return (
          <ul className="" key={index}>
            <li className="font-bold text-2xl">{item.title}</li>
            {item.contents.map((content: any, index: number) => {
              return (
                <li
                  className="py-4 hover:text-blue-600 break-words"
                  key={index}
                >
                  <Link to={content.url}>{content.title}</Link>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

export default PcContent;
