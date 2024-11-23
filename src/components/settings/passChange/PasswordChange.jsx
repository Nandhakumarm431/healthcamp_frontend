import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import './passChng.css'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NotificationManager } from 'react-notifications'
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const PasswordChange = () => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const currentUser = localStorage.getItem('userData')
    const userProfile = JSON.parse(currentUser)
    const userId = userProfile ? userProfile.id : null;


    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    const handleClickShowPassword3 = () => setShowPassword3((show) => !show);

    const changePassword = async () => {
        let payload = {
            id: userId,
            password: currentPassword,
            newpassword: newPassword,
            newpassword2: confirmPassword,
        }
        console.log('pa', payload);
        try {
            const res = await fetch(`${apiUrl}/api/auth/changePassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const data = await res.json();
                NotificationManager.success(data.message)
                setNewPassword(''); setCurrentPassword(''); setconfirmPassword('');
            } else {
                const data = await res.json();
                NotificationManager.error(data.message)
            }
        } catch (error) {
            NotificationManager.error(error.message)
        }

    }

    return (
        <>
            <div className='changepwd-con'>
                <div>
                    <h3>Change Password</h3>
                </div>
                <div className='passchange'>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password1">Current Password</InputLabel>
                        <Input
                            id="standard-adornment-password1"
                            type={showPassword1 ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword1}
                                    >
                                        {showPassword1 ? <VisibilityOff className='visible-icon'/> : <Visibility className='visible-icon'/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)} required
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password2">New Password</InputLabel>
                        <Input
                            id="standard-adornment-password2"
                            type={showPassword2 ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword2}
                                    >
                                        {showPassword2 ? <VisibilityOff className='visible-icon'/> : <Visibility className='visible-icon'/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} required
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password3">Confirm Password</InputLabel>
                        <Input
                            id="standard-adornment-password3"
                            type={showPassword3 ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword3}
                                    >
                                        {showPassword3 ? <VisibilityOff className='visible-icon'/> : <Visibility className='visible-icon'/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)} required
                        />
                    </FormControl>
                    <div className='submit-btn'>
                        <Button className='btn-passwrd' variant="outlined" size="small" onClick={changePassword}>
                            Save Password
                        </Button>
                    </div>
                </div>
            </div>
            <NotificationContainer />

        </>
    )
}

export default PasswordChange