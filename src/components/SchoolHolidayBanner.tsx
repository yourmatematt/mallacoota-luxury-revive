import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import { Link } from "react-router-dom";

interface SchoolHoliday {
  name: string;
  start: Date;
  end: Date;
  season: string;
}

const SchoolHolidayBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentHoliday, setCurrentHoliday] = useState<SchoolHoliday | null>(null);
  const [upcomingHoliday, setUpcomingHoliday] = useState<SchoolHoliday | null>(null);

  // Victorian school holiday dates for 2024/2025
  const schoolHolidays: SchoolHoliday[] = [
    {
      name: "Summer Holidays",
      start: new Date('2024-12-20'),
      end: new Date('2025-01-28'),
      season: "summer"
    },
    {
      name: "Easter Holidays",
      start: new Date('2025-03-28'),
      end: new Date('2025-04-13'),
      season: "easter"
    },
    {
      name: "Winter Holidays",
      start: new Date('2025-06-28'),
      end: new Date('2025-07-13'),
      season: "winter"
    },
    {
      name: "Spring Holidays",
      start: new Date('2025-09-20'),
      end: new Date('2025-10-05'),
      season: "spring"
    }
  ];

  useEffect(() => {
    const today = new Date();
    
    // Find current holiday (if we're in one)
    const current = schoolHolidays.find(holiday => 
      today >= holiday.start && today <= holiday.end
    );
    
    // Find next upcoming holiday
    const upcoming = schoolHolidays
      .filter(holiday => holiday.start > today)
      .sort((a, b) => a.start.getTime() - b.start.getTime())[0];
    
    setCurrentHoliday(current || null);
    setUpcomingHoliday(upcoming || null);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', { 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const getHolidayMessage = () => {
    if (currentHoliday) {
      return {
        title: `${currentHoliday.name} are here!`,
        subtitle: `Perfect time for your Mallacoota family getaway`,
        cta: "Book Your Stay",
        urgent: true
      };
    } else if (upcomingHoliday) {
      const daysUntil = Math.ceil((upcomingHoliday.start.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return {
        title: `Book now for ${upcomingHoliday.name}`,
        subtitle: `${formatDate(upcomingHoliday.start)} - ${formatDate(upcomingHoliday.end)} • ${daysUntil} days to go`,
        cta: "Secure Your Dates",
        urgent: daysUntil <= 30
      };
    }
    return null;
  };

  const holidayMessage = getHolidayMessage();

  if (!isVisible || !holidayMessage) return null;

  return (
    <div className={`relative border-b border-border/20 ${
      holidayMessage.urgent ? 'bg-accent-red text-white' : 'bg-boutique-accent/10 text-primary'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 flex-shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="font-semibold text-sm sm:text-base">
                {holidayMessage.title}
              </span>
              <span className="text-xs sm:text-sm opacity-90">
                {holidayMessage.subtitle}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              asChild 
              variant={holidayMessage.urgent ? "secondary" : "accent"}
              size="sm"
              className="text-xs sm:text-sm px-3 py-1.5"
            >
              <Link to="/properties">
                {holidayMessage.cta}
              </Link>
            </Button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded-full hover:bg-black/10 transition-colors"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolHolidayBanner;