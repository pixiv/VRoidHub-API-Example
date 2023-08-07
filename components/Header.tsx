import styled from 'styled-components';
import { Icon } from './UserIcon';

type Props = {
  icon_img_url: string;
  username: string;
};

export function IndexPageHeader(props: Props) {
  return (
    <HeaderContainer>
      <HeaderTitle>キャラクターを選択</HeaderTitle>
      <Icon {...props} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  margin: 0px;
  display: flex;
  justify-content: center;
`;

const HeaderTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.size[20].fontSize}px;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
`;
