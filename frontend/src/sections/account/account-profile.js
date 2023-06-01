import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { useRef } from 'react';
import axios from 'axios';
import ConfigService from 'src/services/configService';
const configService = ConfigService();
export const AccountProfile = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    fileInputRef.current.click(); // Trigger click event on file input
  };
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append('image', file);
      console.log(formData);
      try{
      await axios.post(`${configService.url}/users/myself/upload-image`, formData, {
        params: {id:user?.id}});
      console.log('Image uploaded successfully');
      alert("Profile picture is successfully uploaded. Refresh the page to see the changes.");
      }
      
      catch(e){
        console.log('Failed to upload image:', e);
      }
  }

  };
  return (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={`data:image/*;base64,${user?.image}`}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user?.role}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button onClick={handleUpload}
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
      <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
    </CardActions>
  </Card>
  )
        };
