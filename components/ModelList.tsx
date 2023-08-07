import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Checkbox,
  ModalAlign,
  ModalButtons,
  LoadingSpinner,
} from '@charcoal-ui/react';
import styled from 'styled-components';
import type { ModelData } from '../types/vroid';

type Props = {
  items: ModelData[];
  title: string;
  message: string;
  loading: boolean;
  hasNext: boolean;
  onRequestLoadNext: () => void;
};

/** キャラクター一覧コンポーネント */
export function ModelList({ items, title, message, loading, hasNext, onRequestLoadNext }: Props) {
  const showMore = useCallback(() => {
    onRequestLoadNext();
  }, [onRequestLoadNext]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ModelBoxContiner>
        <ModelBoxTitle>{title}</ModelBoxTitle>
        <ExplainMessage>{message}</ExplainMessage>

        {items.length === 0 && loading ? (
          <div style={{ width: '100%' }}>
            <LoadingSpinner />
          </div>
        ) : (
          <ModelsGrid>
            {items.map((model: ModelData) => {
              return <EachModel key={model.id} model={model} />;
            })}
          </ModelsGrid>
        )}

        {hasNext ? (
          <ShowMoreButtonWrapper>
            <div style={{ display: 'grid', width: '264px' }}>
              <Button variant="Navigation" fullWidth onClick={showMore} size="S">
                <ShowMoreButtonText>もっと見る</ShowMoreButtonText>
              </Button>
            </div>
          </ShowMoreButtonWrapper>
        ) : (
          <></>
        )}
      </ModelBoxContiner>
    </div>
  );
}

const EachModel = ({ model }: { model: ModelData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMoralAgreed, setIsMoralAgreed] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const handleClickUseModel = useCallback(
    () => router.push(`/vrm?id=${model.id}&size=${model.originalFileSize}`),
    [router, model.id, model.originalFileSize],
  );

  const handleClickMoralAgreed = useCallback((value: boolean) => setIsMoralAgreed(() => value), [setIsMoralAgreed]);

  const makeDateString = (isoStr: string) => {
    // 時間が0-9分の時の対応。例えば、「15:9」ではなく「15:09」と表示するため。
    const makeMinutesSafe = (min: number) => {
      if (0 <= min && min <= 9) {
        return `0${min}`;
      }
      return min;
    };

    const date = new Date(isoStr);
    return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日 ${date.getHours()}:${makeMinutesSafe(
      date.getMinutes(),
    )}`;
  };

  return (
    <>
      <ListModelImgContaier>
        <ListModelImg src={model.iconSquareImageUrl} onClick={handleClick} />
      </ListModelImgContaier>
      <Modal
        isDismissable={true}
        title="利用条件の確認"
        size="M"
        isOpen={isOpen}
        onClose={handleClick}
        portalContainer={typeof document !== 'undefined' ? document.body : undefined}
        bottomSheet="full"
      >
        <ModalBody style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
          <ModalHeader />
          <ModalUpper>
            <ModalImageContainer>
              <ModalImage src={model.portraitImageUrl as string} />
              <ModalImage src={model.fullBodyImageUrl as string} />
            </ModalImageContainer>
            <div>
              <ChracterModelNameContainer>
                <CharacterName>{model.characterName}</CharacterName>
                <ModelName>{model.modelName ? ` / ${model.modelName}` : ''}</ModelName>
              </ChracterModelNameContainer>
              <AuthorData>
                <UserIcon src={model.user.iconUrl} />
                <UserName>{model.user.name}</UserName>
                <CreatedAt>{makeDateString(model.createdAt)}</CreatedAt>
              </AuthorData>
            </div>
          </ModalUpper>

          {/* モーダルの利用条件部分 */}
          <LicenseContainer>
            <LicenseRow style="info" title="フォーマット" value={model.format} />
            <LicenseRow style={model.license.characterization ? 'ok' : 'ng'} title="アバターとしての利用" />
            <LicenseRow style={model.license.violentExpression ? 'ok' : 'ng'} title="暴力表現での利用" />
            <LicenseRow style={model.license.sexualExpression ? 'ok' : 'ng'} title="性的表現での利用" />
            <LicenseRow style={model.license.corporateCommercialUse ? 'ok' : 'ng'} title="法人の商用利用" />
            <LicenseRow style={model.license.personalNonCommercialUse ? 'ok' : 'ng'} title="個人の商用利用" />
            <LicenseRow
              style={model.license.personalCommercialUse ? 'ok' : 'ng'}
              title="┗  個人の営利目的の活動（ギフティング等）"
            />
            <LicenseRow
              style={model.license.personalNonCommercialUse ? 'ok' : 'ng'}
              title="┗  個人の非営利目的の活動（同人誌活動）のみ"
            />
            <LicenseRow style={model.license.modification ? 'ok' : 'ng'} title="改変" />
            <LicenseRow style={model.license.redistribution ? 'ok' : 'ng'} title="再配布" />
            <LicenseRow style="info" title="クレジット表示" value={model.license.credit ? '不要' : '必要'} />
          </LicenseContainer>

          {/* モーダルフッター部分 */}
          <ModalFooter>
            <ModalAlign>
              <Checkbox checked={isMoralAgreed} onChange={handleClickMoralAgreed}>
                利用条件にしたがってモデルデータを利用する
              </Checkbox>
            </ModalAlign>
            <ModalButtons>
              <Button variant="Primary" disabled={isMoralAgreed ? false : true} fullWidth onClick={handleClickUseModel}>
                利用する
              </Button>
            </ModalButtons>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};

// 一番外側のやつ。
const ModelBoxContiner = styled.div`
  container-type: inline-size;
  max-width: 1224px;
  width: 100%;
`;

// 「あなたのキャラクター」「❤︎したキャラクター」とか
const ModelBoxTitle = styled.h3`
  font-weight: 700;
  margin: 0px;
  padding-bottom: 8px;
  font-size: ${(props) => props.theme.typography.size[20].fontSize}px;
  display: block;
`;

// 上の「あなたのキャラクター」などの下に出てくる説明文
const ExplainMessage = styled.h5`
  display: block;
  font-weight: 400;
  font-size: ${(props) => props.theme.typography.size[16].fontSize}px;
  margin: 0px;
  margin-bottom: 8px;
`;

// grid. この中でmapしてる
const ModelsGrid = styled.div`
  gap: 16px;
  display: grid;
  @container (min-width: 700px) {
    grid-template-columns: repeat(6, minmax(100px, 1fr));
  }
  @container (max-width: 699px) {
    grid-template-columns: repeat(3, minmax(100px, 1fr));
  }
`;

// 「もっと見る」ボタンの入れ物
const ShowMoreButtonWrapper = styled.div`
  margin: 0px;
  margin-top: ${(props) => props.theme.spacing[24]}px;
  display: flex;
  justify-content: center;
`;

// 「もっと見る」ボタンの中身テキスト
const ShowMoreButtonText = styled.p`
  font-size: ${(props) => props.theme.typography.size[14].fontSize}px;
  margin: 0px;
`;

// モデル一覧表示の画像。下のListCharacterImgを囲む。
const ListModelImgContaier = styled.div`
  position: relative;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  // この辺はhover/clickした時のオーバーレイ
  &:hover {
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: ${(props) => props.theme.color.surface7};
      pointer-events: none;
    }
  }
  &:active {
    &:before {
      pointer-events: none;
      content: '';
      position: absolute;
      width: 100%;
      height: 100;
      background: ${(props) => props.theme.color.surface3};
    }
  }
`;

const ListModelImg = styled.img`
  border-radius: 2px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// -------------以下モーダル用------------------

// モーダルの上半分。写真と名前
const ModalUpper = styled.div`
  padding: ${(props) => props.theme.spacing[16]}px;
`;

// モーダルに表示される写真
const ModalImage = styled.img`
  width: 100%;
  display: inline-block;
  border-radius: 10px;
`;

// ModalImageを囲む。立ち絵が「胸から上」と「全身」で２つあって、そのコンテナ。
const ModalImageContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[16]}px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

// Modalで表示する、モデル作成者のusername
const UserName = styled.h5`
  color: rbg(200, 200, 200);
  display: inline-block;
  margin: 0px;
  font-weight: 400;
`;

// Modalで表示する、モデル作成者のアイコン
const UserIcon = styled.img`
  border-radius: 50%;
  display: inline-block;
  width: 20px;
  vertical-align: middle;
  margin-right: ${(props) => props.theme.spacing[8]}px;
`;

// Modalで表示する、作成者データの入れ物
const AuthorData = styled.div``;

// キャラクター名・モデル名の入れ物
const ChracterModelNameContainer = styled.div`
  margin-bottom: 4px;
`;

// Modalで表示する、キャラクターの名前
const CharacterName = styled.h2`
  margin: 0px;
  font-weight: 700;
  display: inline;
`;

// Modalで表示する、モデル名
const ModelName = styled.h2`
  margin: 0px;
  font-weight: 700;
  color: #858585;
  display: inline;
`;

const ModalFooter = styled.div`
  margin: 0px;
  padding: 0px;
  margin-top: 16px;
`;

// Modalで表示する、created_at
const CreatedAt = styled.h6`
  color: gray;
  display: inline-block;
  margin: 0px;
  margin-left: ${(props) => props.theme.spacing[8]}px;
  font-weight: 400;
`;

const LicenseRowContainer = styled.div`
  margin: 0px;
  margin: ${(props) => props.theme.spacing[8]}px;
  font-size: ${(props) => props.theme.typography.size[14].fontSize}px;
  line-height: ${(props) => props.theme.typography.size[14].lineHeight}px;
`;

// モーダルの利用規約確認。項目の方。色毎に分かれてるだけ。
const LicenseTitleGrey = styled.p`
  color: ${(props) => props.theme.color.surface4};
  display: inline;
  font-weight: 400;
`;
const LicenseTitleBlack = styled.p`
  color: ${(props) => props.theme.color.text2};
  display: inline;
  font-weight: 400;
`;

// モーダルの利用規約確認。「OK」「NG」の方。色毎に分かれてるだけ。
const LicenseItemGreen = styled.h4`
  color: ${(props) => props.theme.color.success};
  display: inline;
  font-weight: 700;
`;
const LicenseItemGrey = styled.h4`
  color: ${(props) => props.theme.color.surface4};
  display: inline;
  font-weight: 700;
`;
const LicenseItemBlack = styled.h4`
  color: ${(props) => props.theme.color.text2};
  display: inline;
  font-weight: 700;
`;

// モーダルのライセンスの入れ物
const LicenseContainer = styled.div`
  border-top: solid thin ${(props) => props.theme.color.surface10};
  border-bottom: solid thin ${(props) => props.theme.color.surface10};
  padding: ${(props) => props.theme.spacing[16]}px;
`;

// ライセンスの表示ロジック切り出し
// title:value の形で表示。
// これの色が 黒：黒をinfo, 黒：緑をok, 灰色：灰色をng, としてstyleを受け取る
const LicenseRow = ({ style, title, value }: { style: 'info' | 'ok' | 'ng'; title: string; value?: string }) => {
  if (value == null) value = style == 'ok' ? 'OK' : 'NG';

  switch (style) {
    case 'info':
      return (
        <LicenseRowContainer>
          <LicenseTitleBlack>{title}</LicenseTitleBlack> : <LicenseItemBlack>{value}</LicenseItemBlack>
        </LicenseRowContainer>
      );
    case 'ok':
      return (
        <LicenseRowContainer>
          <LicenseTitleBlack>{title}</LicenseTitleBlack> : <LicenseItemGreen>{value}</LicenseItemGreen>
        </LicenseRowContainer>
      );
    case 'ng':
      return (
        <LicenseRowContainer>
          <LicenseTitleGrey>{title}</LicenseTitleGrey> : <LicenseItemGrey>{value}</LicenseItemGrey>
        </LicenseRowContainer>
      );
  }
};
