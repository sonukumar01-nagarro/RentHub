export function getInitialsFofEmail(email: string) {
  if (!email) {
    return '';
  }
  const split = email.split('@')?.[0]?.split('.');
  const initials =
    split?.length > 1 ? split?.reduce((acc, el) => acc?.[0] + el?.[0]) : split?.[0]?.[0];
  return initials;
}
