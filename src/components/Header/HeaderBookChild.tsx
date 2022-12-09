import {NaverBooksDataType} from '../../types/bookSearch';

type CarouselBookChildProps = {
  data: NaverBooksDataType;
  width?: number;
  height?: number;
};

const HeaderBookChild = ({
  data,
  width = 40,
  height = 20,
}: CarouselBookChildProps) => {
  return <></>;
};
export default HeaderBookChild;
