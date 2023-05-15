import { Autocomplete,Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Restaurant } from "../../models/Restaurant";
import { useEffect, useState } from "react";
import { Reservation } from "../../models/Reservation";
import { ReservationDetails} from "./ReservationDetails";
import { debounce } from "lodash";
import { useCallback } from "react";
import {Customer } from "../../models/Customer";

export const UpdateReservation = () => {
    const { reservationId } = useParams();
    const navigate = useNavigate();
    const [ reservationDetails, setReservationDetails ] = useState<Reservation>();
    

    const fetchReservation = async () => {
        const response = await fetch(`${BACKEND_API_URL}/reservations/${reservationId}`);
        const reservation = await response.json();
        setReservationDetails(reservation);
    };

    useEffect(() => {
         fetchReservation()
    }, [reservationId])


    const [reservation, setReservation] = useState<Reservation>({
        id: parseInt(String(reservationId)),
        customer_id: 1,
        restaurant_id: 1,
        date: new Date(),
        number_of_persons: 1,
        type:"" ,
    });

    const UpdateReservation= async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/reservations/${reservationId}`,reservation);
            navigate("/reservations");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/reservations");
    };

    console.log('reservationId', reservationDetails)
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

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/reservations`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={UpdateReservation} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                              Type
                            </FormLabel>
                            <TextField
                                required
                                id="type"
                                variant="outlined"
                                defaultValue={reservationDetails?.type}
                                onChange={(event) => setReservation({ ...reservation, type: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Number of Persons
                            </FormLabel>
                            <TextField
                                required
                                id="number_of_persons"
                                variant="outlined"
                                defaultValue={reservationDetails?.number_of_persons}
                                onChange={(event) => setReservation({  ...reservation, number_of_persons: Number(event.target.value) })}
                            />
                        </Container>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Date
                            </FormLabel>
                            <TextField
                                required
                                id="date"
                                variant="outlined"
                                defaultValue={reservationDetails?.date}
                                onChange={(event) => setReservation({ ...reservation, date: new Date(event.target.value) })}
                            />
                        </Container>
                       
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
                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={UpdateReservation} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}