import { VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function useVRM(id: string): {
  /** vrm本体　 */
  vrm: VRM;
  /** fetch済みのサイズ(byte) */
  fetchedSize: number;
} {
  // vrmをfetchしてその中身と、その進捗状況を保持する
  // vrm:fetchしてきたVRMファイル
  // fetchedSize:fetchの進捗（バイト数）

  const [vrm, setVrm] = useState<VRM | null>(null);
  const [fetchedSize, setFetchedSize] = useState<number>(0);
  const refVRM = useRef<VRM>();

  useEffect(() => {
    const fetchModel = async () => {
      const res = await fetch(`api/vroid/vrm?id=${id}`);

      // fetchの進捗を取得する
      const vrmReader = res.body.getReader();

      let receivedBytes = 0;
      let chunks = [];
      while (true) {
        const { done, value } = await vrmReader.read();
        if (done) break;

        chunks.push(value);
        receivedBytes += value.length;
        setFetchedSize(receivedBytes);
      }

      const modelBlob = new Blob(chunks);
      const vrmUrl = URL.createObjectURL(modelBlob);
      const loader = new GLTFLoader();
      loader.register((parser) => {
        return new VRMLoaderPlugin(parser);
      });

      loader.load(
        vrmUrl,
        (gltf) => {
          // dispose previous VRM
          const prevVRM = refVRM.current;
          if (prevVRM) {
            VRMUtils.deepDispose(prevVRM.scene);
            setVrm(null);
            setFetchedSize(0);
          }

          // prepare vrm
          const vrm = gltf.userData.vrm as VRM;

          vrm.scene.traverse((obj) => {
            obj.frustumCulled = false;
            if ((obj as THREE.Mesh).isMesh) {
              obj.castShadow = true;
            }
          });

          VRMUtils.rotateVRM0(vrm);

          // set VRM
          setVrm(vrm);
          refVRM.current = vrm;
        },
        (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
        (error) => {
          console.error('An error happened');
          console.error(error);
        },
      );
    };
    fetchModel();
  }, [id]);

  return { vrm: vrm, fetchedSize: fetchedSize };
}
