import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// Type definitions for the component props
interface DateRangePickerProps {
  value: [Date, Date] | null;
  onChange: (dates: [Date, Date] | null) => void;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  className,
}) => {
  // Format dates to display in the input fields
  const formattedStartDate = value ? format(value[0], "PPP") : "";
  const formattedEndDate = value ? format(value[1], "PPP") : "";

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        Select Date Range
      </label>
      <DatePicker
        selected={value ? value[0] : null}
        onChange={(dates: [Date, Date] | null) => onChange(dates)}
        startDate={value ? value[0] : null}
        endDate={value ? value[1] : null}
        selectsRange
        inline
        dateFormat="PPP"
        className="p-2 border border-gray-300 rounded-md"
        placeholderText="Select a date range"
      />
      <div className="mt-2 text-sm text-gray-500">
        {formattedStartDate && formattedEndDate ? (
          <span>
            From: <strong>{formattedStartDate}</strong> To:{" "}
            <strong>{formattedEndDate}</strong>
          </span>
        ) : (
          <span>Please select a date range.</span>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
