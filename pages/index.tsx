import { signIn, useSession } from 'next-auth/client';

import React, { useCallback, useState } from 'react';
import { useAsync } from 'react-use';
import { useRouter } from 'next/router';

import { Button } from '@charcoal-ui/react';
import styled from 'styled-components';

import { ModelList } from '../components/ModelList';
import type { ModelData } from '../types/vroid';
import { IndexPageHeader } from '../components/Header';

type ModelsListState = {
  nextMaxId: string | null;
  maxId: string | null;
  items: ModelData[];
};

export default function Index() {
  const [session] = useSession();
  const router = useRouter();

  //　ユーザーが保持しているモデルの一覧
  const [userModels, setUserModels] = useState<ModelsListState>({ maxId: null, nextMaxId: null, items: [] });
  const [heartsModels, setHeartsModels] = useState<ModelsListState>({ maxId: null, nextMaxId: null, items: [] });
  const [staffPickModels, setStaffPickModels] = useState<ModelsListState>({ maxId: null, nextMaxId: null, items: [] });

  // あなたのキャラクター
  const { loading: userModelsLoading } = useAsync(async () => {
    const url = new URL('/api/vroid/models/account', location.origin);
    if (userModels.maxId) url.searchParams.append('max_id', userModels.maxId);

    const accountRes = await fetch(url);
    if (accountRes.status != 200) return console.log('failed to fetch account...');
    const json = await accountRes.json();

    setUserModels((prev) => ({
      maxId: prev.maxId,
      nextMaxId: json.maxId,
      items: [...prev.items, ...json.data],
    }));
  }, [userModels.maxId]);

  // ❤︎したキャラクター
  const { loading: heartsModelsLoading } = useAsync(async () => {
    const url = new URL('/api/vroid/models/hearts', location.origin);
    if (heartsModels.maxId) url.searchParams.append('max_id', heartsModels.maxId);

    const heartsRes = await fetch(url);
    if (heartsRes.status != 200) return console.log('failed to fetch hearts...');
    const json = await heartsRes.json();

    setHeartsModels((prev) => ({
      maxId: prev.maxId,
      nextMaxId: json.maxId,
      items: [...prev.items, ...json.data],
    }));
  }, [heartsModels.maxId]);

  // 注目のモデル
  const { loading: staffPickModelsLoading } = useAsync(async () => {
    const url = new URL('/api/vroid/models/staff_picks', location.origin);
    if (staffPickModels.maxId) url.searchParams.append('max_id', staffPickModels.maxId);

    const staffPickRes = await fetch(url);
    if (staffPickRes.status != 200) return console.log('failed to fetch staff_picks...');
    const json = await staffPickRes.json();

    setStaffPickModels((prev) => ({
      maxId: prev.maxId,
      nextMaxId: json.maxId,
      items: [...prev.items, ...json.data],
    }));
  }, [staffPickModels.maxId]);

  const handleNextUserModels = useCallback(() => {
    setUserModels((prev) => ({ ...prev, maxId: prev.nextMaxId }));
  }, [setUserModels]);

  const handleNextHeartsModels = useCallback(() => {
    setHeartsModels((prev) => ({ ...prev, maxId: prev.nextMaxId }));
  }, [setHeartsModels]);

  const handleNextStaffPickModels = useCallback(() => {
    setStaffPickModels((prev) => ({ ...prev, maxId: prev.nextMaxId }));
  }, [setStaffPickModels]);

  return (
    <div>
      {!session && (
        <>
          <LoginButtonWrapper>
            <Button variant="Primary" onClick={() => signIn()}>
              Sign in
            </Button>
          </LoginButtonWrapper>
        </>
      )}
      {session && (
        <BodyDiv>
          <IndexPageHeader icon_img_url={session.user.image} username={session.user.name} />
          <TitleContentSpacer />
          <>
            <ModelList
              items={userModels.items}
              title="あなたのキャラクター"
              message="あなたがVRoid Hubにアップロードしたキャラクターが表示されています。"
              loading={userModelsLoading}
              hasNext={!!userModels.nextMaxId}
              onRequestLoadNext={handleNextUserModels}
            />
            <SectionSpacer />
          </>

          <>
            <ModelList
              items={heartsModels.items}
              title="♥したキャラクター"
              message="あなたがVRoid Hubで♥したキャラクターが並んでいます。"
              loading={heartsModelsLoading}
              hasNext={!!heartsModels.nextMaxId}
              onRequestLoadNext={handleNextHeartsModels}
            />
            <SectionSpacer />
          </>

          <>
            <ModelList
              items={staffPickModels.items}
              title="注目のモデル"
              message="あなたにおすすめのキャラクターが並んでいます。"
              loading={staffPickModelsLoading}
              hasNext={!!staffPickModels.nextMaxId}
              onRequestLoadNext={handleNextStaffPickModels}
            />
          </>

          <PageBottomDivider />

          <ToVRoidHubButtonWrapper>
            <div style={{ width: '264px', display: 'grid' }}>
            <Button variant="Navigation" fullWidth size="S" onClick={() => router.push(process.env.NEXT_PUBLIC_VROID_HUB_URL)}>
                <ToVRoidHubButtonText>VRoid Hubでキャラクターを探す</ToVRoidHubButtonText>
              </Button>
            </div>
          </ToVRoidHubButtonWrapper>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HowToRegisterText href="https://vroid.pixiv.help/hc/ja/articles/4404654268953">
              自分のキャラクター（VRM形式）を登録するには
            </HowToRegisterText>
          </div>
        </BodyDiv>
      )}
    </div>
  );
}

const BodyDiv = styled.div`
  margin: 20px;
  position: relative;
`;

const LoginButtonWrapper = styled.div`
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleContentSpacer = styled.div`
  padding: 20px;
`;

// 「あなたもモデル」と「❤︎したモデル」の間のスペース。
const SectionSpacer = styled.div`
  margin: 64px;
`;

// 「VRoid Hubで探す」ボタンの入れ物
const ToVRoidHubButtonWrapper = styled.div`
  margin: 0px;
  display: flex;
  justify-content: center;
`;

//  「VRoid Hubで探す」ボタンの中のテキスト
const ToVRoidHubButtonText = styled.p`
  margin: 0px;
`;

const PageBottomDivider = styled.div`
  border-bottom: solid 1px #d6d6d6;
  margin: 0px;
  padding-bottom: 36px;
  margin-bottom: 40px;
`;

// 「自分のキャラクター(VRM形式)を登録するには」
const HowToRegisterText = styled.a`
  color: ${(props) => props.theme.color.link1};
  margin-top: 24px;
  margin-bottom: 48px;
  text-decoration: none;
`;
