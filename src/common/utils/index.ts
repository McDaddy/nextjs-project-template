import { AxiosResponse } from 'axios';

export * from './use-hooks';

export const downloadFileAxios = (response: AxiosResponse) => {
  const { headers, data } = response;
  const type = headers['content-type'];
  const disposition = headers['content-disposition'];
  const [, fileName] = disposition.split('=');
  const blob = new Blob([data], { type });
  const fileUrl = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = fileUrl;
  anchor.target = '_blank';
  anchor.download = decodeURIComponent(fileName);
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  setTimeout(() => {
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(fileUrl);
  }, 100);
};
