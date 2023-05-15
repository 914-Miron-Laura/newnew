import { Button, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Restaurant } from "../../models/Restaurant"
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Customer} from "../../models/Customer";
import React from 'react';
//import utils from 'utils';
// import { name_is_alphabetic } from './utils';


export const CustomerAdd = () => {
	const navigate = useNavigate();
	const [customer, setCustomer] = useState<Customer>({
	first_name: "",
	last_name: "",
	phone_number: "",
	age: 1,
    gender: "",
	reservation_counter: 1,
	});
	const addCustomer= async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/customers/`, customer);
			navigate("/customers");
		} catch (error) {
			console.log(error);
		}
	};

const [popularityError, setPopularityError] = useState('');
function handlePopularityChange(event: any) {
  const input = event.target.value;
  const regex = /^\d{10}$/;
  if (regex.test(input)) {
    setPopularityError('');
    setCustomer({ ...customer, phone_number: input });
  } else {
    setPopularityError('popularity must exactly 10 digits!');
  }
}
// const [ageError, setAgeError] = useState('');
// function handleAgeChange(event: any) {
//   const input = event.target.value;
//   const regex = /^\d{0,1}$/;
//   if (regex.test(input)) {
//     setPopularityError('');
//     setCustomer({ ...customer, age: input });
//   } else {
//     setPopularityError('Age must be 0,100!');
//   }
// } 
const [ageError, setAgeError] = useState('');

function handleAgeChange(event: any) {
  const input = event.target.value;
  const regex = /^\d{0,2}$/;
  if (regex.test(input)) {
    const age = parseInt(input);
    if (age >= 0 && age <= 100) {
      setAgeError('');
      setCustomer({ ...customer, age });
    } else {
      setAgeError('Age must be between 0 and 100!');
    }
  } else {
    setAgeError('Age must be a number!');
  }
}


// const [name, setName] = useState('');
// const [nameError, setNameError] = useState('');

// function handleNameChange(event: any) {
//   const input = event.target.value;
//   try {
// 	name_is_alphabetic(input); // validate the input using the provided function
// 	setNameError('');
// 	setName(input);
//   } catch (error:any) {
// 	setNameError(error.message);
//   }
// }


	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/customers`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addCustomer}>
						<TextField
							id="first_name"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCustomer({ ...customer, first_name: event.target.value })}
						/>
						<TextField
							id="last_name"
							label="Last Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCustomer({ ...customer, last_name: event.target.value })}
						/>
                        <TextField
							id="phone_number"
							label="Phone Number"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
						//	onChange={(event) => setCustomer({ ...customer, phone_number: event.target.value })}
						onChange={handlePopularityChange}
						error={!!popularityError}
						helperText={popularityError}
						/>
                        <TextField
							id="age"
							label="Age"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
						//	onChange={(event) => setCustomer({ ...customer, age: Number(event.target.value) })}
						onChange={handleAgeChange}
						error={!!ageError}
						helperText={ageError}
						/>

                        <TextField
							id="gender"
							label="Gender"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCustomer({ ...customer, gender: event.target.value })}
						/>
						<Button type="submit">Add Customer</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};