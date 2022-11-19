import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

function ProfileContainer(props: Props) {
  return <div>{props.children}</div>;
}

export default ProfileContainer;
