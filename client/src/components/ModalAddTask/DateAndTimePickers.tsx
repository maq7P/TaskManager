import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { today } from '../../utils/utils';



interface Props {
  label: string,
  setLine: (e: any) => void,
  defaultValue?: string | Date
}
const DateAndTimePickers:React.FC<Props> = ({setLine, label, defaultValue}):React.ReactElement => {

  const [selectedDate, setSelectedDate] = React.useState<string | Date>(
    defaultValue || new Date(today())
  );
  const handleDateChange = (date: any) => {
    setLine(date)
    setSelectedDate(date)
  };
  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}
export default DateAndTimePickers