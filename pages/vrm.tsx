import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@charcoal-ui/react';
import styled from 'styled-components';
import { ProgressBar } from '../components/progressBar';

// for vrm
import * as THREE from 'three';
import { VRM } from '@pixiv/three-vrm';
import { useVRM } from '../lib/useVRM';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { createVRMAnimationClip, VRMAnimation, VRMAnimationLoaderPlugin } from '@pixiv/three-vrm-animation';

export default function Model() {
  const router = useRouter();
  const { id, size } = router.query;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const { vrm, fetchedSize } = useVRM(id as string);

  const onClickBackToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const resizeCanvas = () => {
      root.style.width = `${document.documentElement.clientWidth}px`;
      root.style.height = `${document.documentElement.clientHeight}px`;
    };
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div ref={rootRef}>
      {vrm == undefined ? (
        <ProgressBarContainer>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ProgressBarText>呼び出しています</ProgressBarText>
          </div>
          <ProgressBar max={+size} value={fetchedSize} />
        </ProgressBarContainer>
      ) : (
        <Canvas flat>
          <PerspectiveCamera makeDefault position={[-0.12, 1, 4]} />
          <Avatar vrm={vrm} />
          <directionalLight />
        </Canvas>
      )}
      <ButtonContainer>
        <Button fullWidth variant="Primary" onClick={onClickBackToHome}>
          キャラクター選択に戻る
        </Button>
      </ButtonContainer>
    </div>
  );
}

/** VRMアバターを表示するコンポーネント */
const Avatar = ({ vrm }: { vrm: VRM }) => {
  const mixer = useRef<THREE.AnimationMixer>();
  const action = useRef<THREE.AnimationAction>();
  const [show, setShow] = useState(false);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }

    if (vrm) {
      vrm.update(delta);
    }
  });

  const vrmaContainer = useLoader(GLTFLoader, '/idle_loop.vrma', (loader) => {
    loader.register((parser) => {
      return new VRMAnimationLoaderPlugin(parser);
    });
  });

  const vrma = (vrmaContainer.userData.vrmAnimations?.[0] ?? undefined) as VRMAnimation | undefined;

  useEffect(() => {
    const loadAnimation = async () => {
      if (!vrm) return;
      if (!vrma) return;

      const mixerTmp: THREE.AnimationMixer = new THREE.AnimationMixer(vrm.scene);
      mixer.current = mixerTmp;

      const clip = createVRMAnimationClip(vrma, vrm);
      action.current = mixer.current.clipAction(clip);
      action.current.play();

      setShow(true);
    };
    loadAnimation();
  }, [vrm, vrma]);

  return show ? <primitive object={vrm.scene}></primitive> : <></>;
};

// プログレスバーを真ん中に寄せるため
const ProgressBarContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  grid-template-rows: 22px 4px;
  gap: 16px;
  transform: translate(-50%, -50%);
  width: 208px;
`;

// 「表示中」
const ProgressBarText = styled.p`
  font-size: ${(props) => props.theme.typography.size[14].fontSize}px;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 400;
  color: ${(props) => props.theme.color.text2};
  margin: 0px;
`;

// 「キャラクター選択に戻る」ボタン
const ButtonContainer = styled.div`
  position: absolute;
  display: grid;
  bottom: 40px;
  width: 200px;
  left: 50%;
  transform: translate(-50%, 0px);
`;
