type UploadFileResponse = {
  error?: string | unknown;
  imageURL?: string;
  blurpfp?: string;
};

import fetch from 'node-fetch';

export async function uploadFile(file: File, isPfp?: boolean): Promise<UploadFileResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    //@ts-ignore
    const upload = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/upload/image`, {
      method: 'POST',
      body: formData as unknown as URLSearchParams, 
    });

    if (!upload.ok) {
      throw new Error('Failed to upload file');
    }

    const uploadResponse = await upload.json();
    const imageURL = `https://photos.mylinx.cc/${uploadResponse.fileId}`;

    if (!isPfp) return { imageURL };

    const createblurpfp = await fetch('/api/images/createblurpfp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageurl: imageURL }),
    });

    if (!createblurpfp.ok) {
      throw new Error('Failed to create blurpfp');
    }

    const { blurpfp } = await createblurpfp.json();
    return { imageURL, blurpfp };
  } catch (error: any) {
    return { error: error.message };
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};