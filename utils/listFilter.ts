import Person from "@/types/types";

export function listFilter(usersList: Person[], search: string) {
  const filteredList = usersList.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );
  return filteredList;
}
