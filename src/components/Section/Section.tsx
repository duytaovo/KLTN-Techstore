import { ReactNode, forwardRef } from "react";
import clsx from "clsx";
import css from "./section.module.scss";
interface Props {
  title?: string;
  styles?: string;
  children: ReactNode;
  rightOption?: any;
  styleTitle?: string;
}
function Section(
  {
    title,
    styles = "bg-transparent ",
    children,
    rightOption,
    styleTitle,
  }: Props,
  ref: any
) {
  return (
    <section className={clsx(styles)} ref={ref}>
      <div className={clsx(title && css.head, styleTitle)}>
        <p>{title}</p>
        {rightOption}
      </div>
      <div className="flex gap-6 flex-wrap justify-center">{children}</div>
    </section>
  );
}

export default forwardRef(Section);
