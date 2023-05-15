import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios, { AxiosError } from "axios";
import { debounce } from "lodash";
import { useCallback } from "react";
import { Reservation } from "../../models/Reservation";
import { Restaurant } from "../../models/Restaurant";
import { Customer} from "../../models/Customer";
export const ReservationAdd = () => {
	const navigate = useNavigate();

	const [reservation, setReservation] = useState<Reservation>({
        customer_id: 1,
        restaurant_id: 1,
        date: new Date(),
        number_of_persons: 1,
        type: "",
		customer_name: "",
		restaurant_name: "",
	});

    const[restaurants, setRestaurant] = useState<Restaurant[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Restaurant[]>(
				`${BACKEND_API_URL}/restaurants/filter/${query}`
			);
			const data = await response.data;
            setRestaurant(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};


    const[customers, setCustomers] = useState<Customer[]>([]);
	const fetchSuggestions1 = async (query: string) => {
		try {
			const response = await axios.get<Customer[]>(
				`${BACKEND_API_URL}/customers/filter/${query}`
			);
			const data = await response.data;
			setCustomers(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};


	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);
    const debouncedFetchSuggestions1 = useCallback(debounce(fetchSuggestions1, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
            
		};
	}, [debouncedFetchSuggestions]);

    useEffect(() => {
		return () => {
			debouncedFetchSuggestions1.cancel();
            
		};
	}, [debouncedFetchSuggestions1]);


	const addReservation= async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/reservations/`, reservation);
			navigate("/reservations");
		} catch (error) {
			console.log(error);
		}
	};

    const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

    const handleInputChange1 = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions1(value);
		}
	};
   
	const [showeventDateError, setShowEventDateError] = useState('');
	function handleDateChange(event: any) {
		const input = event.target.value;
		const regex = /^\d{1,2}-\d{1,2}-\d{4}$/;
		if (regex.test(input)) {
			setShowEventDateError('');
			setReservation({ ...reservation, date: input });
		}
		else {
			setShowEventDateError('The date format is: DD-MM-YYYY');
		}}
   


	const [numberError, setNumberError] = useState('');
	function handleNumberChange(event: any) {
		  const input = event.target.value;
		  const regex = /^\d{0,1}$/;
		  if (regex.test(input)) {
			setNumberError('');
			setReservation({ ...reservation, number_of_persons: input });
		  } else {
			setNumberError('Nr persons must be > 2 < 20!');
		  }
		}
	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/reservations`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addReservation}>


                    <Autocomplete
							id="customer_id"
							options={customers}
							getOptionLabel={(option) => `${option.first_name} - ${option.last_name}`}
							renderInput={(params) => <TextField{...params} label="Customer" variant="outlined" />}
							filterOptions={(options, state) => options.filter((option) => option.first_name.toLowerCase().includes(state.inputValue.toLowerCase()))}
							onInputChange={handleInputChange1}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setReservation({ ...reservation, customer_id: value.id });
								}
							}}
					/>

                    <Autocomplete
							id="restaurant_id"
							options={restaurants}
							getOptionLabel={(option) => `${option.name} - ${option.adress}`}
							renderInput={(params) => <TextField{...params} label="Restaurant" variant="outlined" />}
							filterOptions={(options, state) => options.filter((option) => option.name.toLowerCase().includes(state.inputValue.toLowerCase()))}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setReservation({ ...reservation, restaurant_id: value.id });
								}
							}}
						/>
                        <TextField
							id="date"
							label="Date"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							//onChange={(event) => setReservation({ ...reservation, date: new Date(event.target.value) })}
							onChange={handleDateChange}
							error={!!showeventDateError}
							helperText={showeventDateError}
						/>

                        <TextField
							id="nr_of_persons"
							label="Number of persons"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
						//	onChange={(event) => setReservation({ ...reservation, number_of_persons:Number( event.target.value) })}
						onChange={handleNumberChange}
						error={!!numberError}
						helperText={numberError}
						/>
                        <TextField
							id="type"
							label="Type"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setReservation({ ...reservation,type:event.target.value })}
						/>
                     
						<Button type="submit">Add Menu</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};