/**
 * 認証が必要なVRoid Hub APIをコールするためのfetchのラッパー関数
 */
export async function fetchWithAuthorized(url: string, token: string, init?: RequestInit) {
  return fetch(url, {
    ...init,
    headers: {
      // VRoid HubのAPI Version
      'X-Api-Version': '11',
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });
}

/**
 * VRMのダウンロードURLを取得する
 */
export async function fetchVRMModel(id: string, token: string): Promise<string | undefined> {
  // download_licensesにPOSTしてlicenseIdを取得
  const licenseRes = await vroidHubApi.postDownloadLicense(token, id);
  if (licenseRes.status != 200) {
    console.error(`fetch /api/download_licenses ended with status ${licenseRes.status}`);
    return;
  }

  const licenseId = (await licenseRes.json()).data.id;

  // license_idが取れなかった時
  if (!licenseId) {
    console.error('failed to get license_id');
    return;
  }

  // 取得したlicenseIdでダウンロードURLを取得する
  // 302 redirectが返ってくるので、Locationに指定されたURLを取得してreturnする
  // ファイルサイズが大きいため、VRMのダウンロードはクライアント側で行う
  const downloadRes = await vroidHubApi.getDownloadLicenseDownload(token, licenseId);
  return downloadRes.headers.get('location');
}

export const vroidHubApi = {
  getAccountCharacterModels: (token: string, options: { max_id?: string; count?: number } = {}) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_VROID_HUB_URL}/api/account/character_models`);
    if (options.max_id) url.searchParams.append('max_id', options.max_id);
    if (options.count) url.searchParams.append('count', options.count.toString(10));
    return fetchWithAuthorized(url.toString(), token);
  },
  getHeartCharacterModels: (token: string, options: { max_id?: string; count?: number } = {}) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_VROID_HUB_URL}/api/hearts`);
    if (options.max_id) url.searchParams.append('max_id', options.max_id);
    if (options.count) url.searchParams.append('count', options.count.toString(10));
    return fetchWithAuthorized(url.toString(), token);
  },
  getStaffPicksModels: (token: string, options: { max_id?: string; count?: number } = {}) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_VROID_HUB_URL}/api/staff_picks`);
    if (options.max_id) url.searchParams.append('max_id', options.max_id);
    if (options.count) url.searchParams.append('count', options.count.toString(10));
    return fetchWithAuthorized(url.toString(), token);
  },
  postDownloadLicense: (token: string, modelId: string) => {
    return fetchWithAuthorized(`${process.env.NEXT_PUBLIC_VROID_HUB_URL}/api/download_licenses`, token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        character_model_id: modelId,
      }),
    });
  },
  getDownloadLicenseDownload: (token: string, licenseId: string) => {
    return fetchWithAuthorized(`${process.env.NEXT_PUBLIC_VROID_HUB_URL}/api/download_licenses/${licenseId}/download`, token, {
      method: 'GET',
      // リダイレクト先URLを取得するため、redirect: manualにする
      redirect: 'manual',
      headers: {
        'Accept-Encoding': 'gzip',
      },
    });
  },
};
