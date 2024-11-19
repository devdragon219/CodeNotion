import { FileType } from '../enums/FileType';

export const downloadFile = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.click();
};

const getFileExtensions = (fileType: FileType) => {
  switch (fileType) {
    case FileType.ApplicationDoc:
      return ['.doc'];
    case FileType.ApplicationDocx:
      return ['.docx'];
    case FileType.ApplicationOds:
      return ['.ods'];
    case FileType.ApplicationOdt:
      return ['.odt'];
    case FileType.ApplicationXls:
      return ['.xls'];
    case FileType.ApplicationXlsx:
      return ['.xlsx'];
    case FileType.ApplicationPdf:
      return ['.pdf'];
    case FileType.ImageDwg:
      return ['.dwg'];
    case FileType.ImageDxf:
      return ['.dxf'];
    case FileType.ImageGif:
      return ['.gif'];
    case FileType.ImageJpeg:
      return ['.jpeg', '.jpg'];
    case FileType.ImagePng:
      return ['.png'];
    case FileType.ImageSvg:
      return ['.svg'];
    case FileType.ImageTiff:
      return ['.tif', '.tiff'];
    case FileType.MessageEml:
      return ['.eml'];
    case FileType.TextCsv:
      return ['.csv'];
    case FileType.Video:
      return ['.mp4', '.avi', '.mpeg'];
  }
};

export const parseFileTypesToAccept = (fileTypes: FileType[]) =>
  fileTypes.reduce(
    (acc, fileType) => ({
      ...acc,
      [fileType]: getFileExtensions(fileType),
    }),
    {},
  );

export const parseFileTypesToExtensions = (fileTypes: FileType[]) => fileTypes.flatMap(getFileExtensions).join(', ');
