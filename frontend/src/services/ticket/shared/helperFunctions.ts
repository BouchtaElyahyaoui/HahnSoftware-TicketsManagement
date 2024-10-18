export const formatDate = (dateString : string) => {
  const date = new Date(dateString);

  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;


};
