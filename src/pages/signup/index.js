import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/copyright';
import { signUp } from '../../services/account';
import Loader from '../../components/loader';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [type,setType] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    //if user is already loggedin
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData && userData.token !== '' ){
     return  props.history.push('/');
    }
  },[])

  const handleSignUpBtnClick = () => {
    if(!email) return alert('Email is required.');
    if(!(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email))) return alert('Please enter valid email.');
    if(!password) return alert('Password is required.');
    if(password.length < 8) return alert('Password length should be >= 8.');
    if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(password))) return alert('Password must contain at least one small and capital alphabet, numbers and special characters.');
    
    setIsLoading(true);
    signUp({email,password,type: type ? 1 : 0}) // {email: '',password: '',type: 0(editor)/1(admin)}
    .then(res => {
        if(res.data.success === 1){
            setIsLoading(false);
            alert(res.data.message);
            props.history.push('/login');
        }
    }) 
    .catch(err =>{
        setIsLoading(false);
        if(err.response && err.response.data){
          alert(err.response.data.message);
        }
    })
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Editor</Grid>
              <Grid item>
                <Switch
                  checked={type}
                  onChange={() => setType(!type)}
                  color="primary"
                  name="User Type"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Grid>
              <Grid item>Admin</Grid>
            </Grid>
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUpBtnClick}
          >
            {
              isLoading 
              ? <div style={{color:'white'}}><Loader/></div>
              : 'Sign Up'
            }
          </Button>
          <Grid container>
            <Grid item>
              <Link to='/sign-up' variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;