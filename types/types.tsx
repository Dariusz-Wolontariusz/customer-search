type Person = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  jobTitle: string;
  company: string;
  department: "Sales" | "Marketing" | "Support" | "IT" | "Finance" | "HR";
  city: string;
  country:
    | "Norway"
    | "Sweden"
    | "Denmark"
    | "Poland"
    | "Germany"
    | "Spain"
    | "France"
    | "Netherlands"
    | "United Kingdom"
    | "United States"
    | "Canada";
  address: string;
  postalCode: string;
  status: "active" | "inactive" | "pending";
  customerType: "private" | "business";
  createdAt: string;
  lastContactedAt: string;
  totalOrders: number;
  totalSpent: number;
  currency: "NOK" | "SEK" | "DKK" | "PLN" | "EUR" | "GBP" | "USD" | "CAD";
  notes: string;
};

export default Person;
