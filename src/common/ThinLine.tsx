import styled from 'styled-components';

type ThinLineProps = {
  color: string;
  thick?: string;
  marginTopBottom?: string;
};

const ThinLine = ({
  color,
  thick = '1px',
  marginTopBottom = '0.6rem',
}: ThinLineProps) => {
  return (
    <ThinLineDiv
      color={color}
      thick={thick}
      marginTopBottom={marginTopBottom}
    />
  );
};
export default ThinLine;
const ThinLineDiv = styled.div<{thick: string; marginTopBottom?: string}>`
  width: 100%;
  border-bottom: ${({thick}) => thick} solid ${({color}) => color};
  margin: ${({marginTopBottom}) => marginTopBottom} 0;
`;
