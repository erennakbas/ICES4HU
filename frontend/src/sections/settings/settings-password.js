import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import axios from 'axios';
import ConfigService from 'src/services/configService';
import { useAuth } from 'src/hooks/use-auth';
const configService = ConfigService();
export const SettingsPassword = () => {
  const [values, setValues] = useState({
    password: '',
    confirmPassword: ''
  });
  const { user } = useAuth();
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.patch(`${configService.url}/users/myself/password`,{id:user?.id, ...values});
      console.log(response)
      setValues({ 
      password: '',
      confirmPassword: ''});
      alert("Password is saved.")
    }
    catch(e){
      alert("Passwords doesn't match or illegal password.")
      console.log(e);
    }

  };

  return (
    <form>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Password (Confirm)"
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              value={values.confirmPassword}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" 
          onClick={handleSubmit}>
            Update Password
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
