import myAxios from "../MyAxio.ts";

export async function uploadFile(file:any) {
    return myAxios(`/api/upload`, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        data:file
    });
}

export async function postFormProgress(chunkNumber:any,chunkSize:any,file:Blob,fileName:any){
    let formData = new FormData();
    formData.append('file',file);
    formData.append('chunkNumber',chunkNumber);
    formData.append('chunkSize',chunkSize);
    formData.append('fileName',fileName)
    return myAxios.post('/upload',formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
}