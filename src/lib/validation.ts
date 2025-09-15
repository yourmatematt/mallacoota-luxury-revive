export const validatePhone = (phone: string): boolean => {
  // Australian phone number validation
  const cleaned = phone.replace(/\s/g, '');
  const phoneRegex = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
  return phoneRegex.test(cleaned);
};

export const formatPhone = (phone: string): string => {
  // Format phone number for display
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('61')) {
    return `+61 ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  } else if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

export const cleanPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters except +
  return phone.replace(/[^\d+]/g, '');
};

export const getPhoneValidationMessage = (): string => {
  return "Please enter a valid Australian phone number (e.g., 0412 345 678 or +61 412 345 678)";
};