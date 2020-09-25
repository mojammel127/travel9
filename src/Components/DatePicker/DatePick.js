import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

  const DatePick = () => {
    const classes = useStyles();
    const date = new Date();
    // console.log(date.getDate(), date.getFullYear(), date.getMonth());
    const dd = date.getDate();
    let mm = date.getMonth();
    let yy = date.getFullYear();
    if(mm<10){
      mm = "0"+mm;
    }
    if(dd<10){
      dd = "0"+dd;
    }
    return (
      <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        type="datetime-local"
        // defaultValue="2020-09-28T10:30"
         defaultValue={`${yy}-${mm}-${dd}T00:00`}
        
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
    );
  }
  
export default DatePick;