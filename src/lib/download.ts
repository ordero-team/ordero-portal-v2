export interface IFileResponse {
  mime: string;
  name: string;
  content: string;
}

export const download = (file: IFileResponse) => {
  // if the content is url then open tab
  if (file.mime === 'text/href') {
    window.open(file.content, '_blank').focus();
  } else {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // download PDF in IE
      const byteChar = atob(file.content);
      const byteArray = new Array(byteChar.length);
      for (let i = 0; i < byteChar.length; i++) {
        byteArray[i] = byteChar.charCodeAt(i);
      }
      const uIntArray = new Uint8Array(byteArray);
      const blob = new Blob([uIntArray], { type: file.mime });
      window.navigator.msSaveOrOpenBlob(blob, file.name);
    } else {
      // Download PDF in Chrome etc.
      const source = `data:${file.mime};base64,${file.content}`;
      const link = document.createElement('a');
      link.href = source;
      link.download = file.name;
      link.click();
    }
  }
};
