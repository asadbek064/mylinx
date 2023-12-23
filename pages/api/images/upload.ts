import B2 from "backblaze-b2";
import { NextApiRequest, NextApiResponse } from "next";

const uploadHandler =async (req:NextApiRequest, res:NextApiResponse) => {
    const chunks: Buffer[] = [];

    // reconstruct file buffer from stream
    const file = await new Promise<Buffer>((resolve) => {
        req.on("readable", () => {
            let chunk: Buffer | null;

            while (null !== (chunk = req.read() as Buffer)) {
                chunks.push(chunk);
            }
        });

        req.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
    });

    const b2 = new B2({
        applicationKeyId: process.env.BACKBLAZE_KEY_ID,
        applicationKey: process.env.BACKBLAZE_APP_KEY
    });

    /* 
        B2 AUTH TOKEN VALID FOR 24HR
        authorize returns the download url
        getUploadUrl return the uplaod url and auth token
    */

    const { data: authData } = await b2.authorize();
    const { data: uploadData } = await b2.getUploadUrl({
        bucketId: process.env.BACKBLAZE_BUCKET_ID
    });
    
    // TODO: figure out how to parse file namefrom form data 
    const reqFileName = "";

    const { data: uploadedFile } = await b2.uploadFile({
        uploadUrl: uploadData.uploadUrl,
        uploadAuthToken: uploadData.authorizationToken,
        data: file,
        fileName: reqFileName as string,
    });

    // Construct friendly URL to retunr in res
    const bucketName = authData.allowed.bucketName as string;
    const downloadURL = authData.downloadUrl as string;

    res.status(200).json({
        url: `${downloadURL}/file/${bucketName}/${uploadedFile.fileName}?timestamp=${uploadedFile.uploadTimestamp}`,
    });
};