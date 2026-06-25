export function totalPages(listLength: number, pageSize: number) {
  return Math.ceil(listLength / pageSize);
}
