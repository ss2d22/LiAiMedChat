import { TitleProps } from "@/types";

/**
 * Title component for the sideBar
 * @author Sriram Sundar
 *
 * @param {TitleProps} param0
 * @param {TitleProps} param0.text
 */
const Title: React.FC<TitleProps> = ({ text }: TitleProps) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};

export default Title;
