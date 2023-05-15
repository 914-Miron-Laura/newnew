import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Reservation} from "../../models/Reservation";


export const ReservationDetails = () => {

    
    const { reservationId } = useParams();
    const [reservation, setReservation] = useState<Reservation>();


	useEffect(() => {
		const fetchReservation = async () => {
            const response = await fetch(`${BACKEND_API_URL}/reservations/${reservationId}`);
			const reservation = await response.json();
            setReservation(reservation);
		};
		fetchReservation();
	}, [reservationId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/reservations`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Reservation Details</h1>
					<p>Reservation nr persons: {reservation?.number_of_persons}</p>
                    <p>Reservation type: {reservation?.type}</p>
                    <p>Reservation Customer: {reservation?.customer_name}</p>
					{/* <ul>
						{reservation?.customers?.map((customer) => (
							<li key={customer.id}>{customer.first_name}</li>
                            
						))}
					</ul> */}
                    <p>Reservation Restaurant: {reservation?.restaurant_name}</p>
					{/* <ul>
					{reservation?.restaurants?.map((restaurant) => (
							<li key={restaurant.id}>{restaurant.name}</li>
						))}
					</ul> */}
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/reservations/${reservationId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/reservations/${reservationId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};