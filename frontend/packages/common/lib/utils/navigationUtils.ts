export const isCurrentRoute = (pathname: string, url: string, match?: 'complete' | 'partial') => {
  const pathnameParts = pathname.split('/');
  const urlParts = url.split('/');

  if (match === 'complete') {
    return (
      pathnameParts.length === urlParts.length && pathnameParts.every((part, index) => urlParts.indexOf(part) === index)
    );
  }

  return urlParts.every((part, index) => pathnameParts.indexOf(part) === index);
};
