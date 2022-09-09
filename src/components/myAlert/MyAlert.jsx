import React, {useEffect} from 'react'
import {Alert} from '@mui/material'

const MyAlert = (props) => {
	
	useEffect(() => {
		setTimeout(() => {
			props.setShowAlert(false)
		}, 2000)
	}, [props.showAlert])
	
	return (
			<Alert severity={props.isError ? 'error' : 'success'}>{props.isError ? 'Something wrong' : 'Success'}</Alert>
	)
}

export default MyAlert;