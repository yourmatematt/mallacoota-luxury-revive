import { useMemo } from 'react';

export const useEmailValidation = (email: string) => {
  return useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);
};

export const useFormValidation = (formData: Record<string, any>) => {
  return useMemo(() => {
    const errors: Record<string, string> = {};
    
    // Email validation
    if (formData.email && !useEmailValidation(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (formData.phone && formData.phone.length > 0) {
      const phoneRegex = /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{7,}$/;
      if (!phoneRegex.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }
    
    // Date validation
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkInDate < today) {
        errors.checkIn = 'Check-in date cannot be in the past';
      }
      
      if (checkOutDate <= checkInDate) {
        errors.checkOut = 'Check-out date must be after check-in date';
      }
    }
    
    // Guests validation
    if (formData.guests && (isNaN(formData.guests) || formData.guests < 1 || formData.guests > 20)) {
      errors.guests = 'Number of guests must be between 1 and 20';
    }
    
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  }, [formData]);
};