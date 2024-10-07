import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import styled from 'styled-components';

type IconProps = {
  icon_img_url: string;
  username: string;
};

export function Icon({ icon_img_url, username }: IconProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickVroidHubItem = useCallback(() => {
    router.push(`${process.env.NEXT_PUBLIC_VROID_HUB_URL}`);
  }, [router]);

  const handleClickLogout = useCallback(() => signOut(), []);

  return (
    <IconContainer>
      <IconImg src={icon_img_url} onClick={handleClick} />
      {isOpen ? (
        <IconModal>
          <IconModalHeader>
            <IconModalImg src={icon_img_url} />
            <IconUserName>{username}</IconUserName>
          </IconModalHeader>
          <IconModalItem onClick={handleClickVroidHubItem}>
            <ModalText>VRoid Hub</ModalText>
          </IconModalItem>
          <IconModalItem onClick={handleClickLogout}>
            <ModalText>ログアウト</ModalText>
          </IconModalItem>
        </IconModal>
      ) : (
        <></>
      )}
    </IconContainer>
  );
}

// 一番外側のやつ
const IconContainer = styled.div`
  display: inline-block;
  margin-left: auto;
  position: absolute;
  right: 0px;
  top: 10px;
`;

// これが右上に出てるアイコン
const IconImg = styled.img`
  border-radius: 50%;
  width: 32px;
  display: inline-block;
  vertical-align: bottom;
`;

// アイコンをクリックして出てくるメニュー全体
const IconModal = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  padding: 8px 0;
  width: 250px;
  border-radius: 8px;
  background-color: white;
  border: solid 1px rgb(200, 200, 200);
  z-index: 1;
`;

// メニューのヘッダー。ユーザー名とアイコンが入る
const IconModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
`;

// メニューの各項目。行。
const IconModalItem = styled.div`
  padding: 16px;
  padding-top: 6px;
  padding-bottom: 6px;
  &:hover {
    background-color: rgb(220, 220, 220);
  }
`;

// クリックして出てくるメニュー内のアイコン
const IconModalImg = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
`;

// メニュー内のテキスト。「VRoidHub」・「ログアウト」・「終了」
const ModalText = styled.h4`
  display: inline-block;
  margin: 0px;
  font-size: ${(props) => props.theme.typography.size[12].fontSize}px;
  font-weight: 400;
`;

// メニューで、アイコンの横のユーザー名
const IconUserName = styled.h4`
  margin: 0;
  display: inline-block;
  font-size: ${(props) => props.theme.typography.size[12].fontSize}px;
  font-weight: 700;
`;
