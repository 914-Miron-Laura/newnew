import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Restaurant} from "../../models/Restaurant";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const RestaurantDetails = () => {
	const { restaurantId } = useParams();
	const [restaurant, setRestaurant] = useState<Restaurant>();

	useEffect(() => {
		const fetchRestaurant = async () => {
			const response = await fetch(`${BACKEND_API_URL}/restaurants/${restaurantId}`);
			const restaurant = await response.json();
			setRestaurant(restaurant);
		};
		fetchRestaurant();
	}, [restaurantId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Restaurant Details</h1>
					<p>Restaurant name: {restaurant?.name}</p>
					<p>Restaurant adress: {restaurant?.adress}</p>
                    <p>Restaurant phone number: {restaurant?.phone_number}</p>
                    <p>Restaurant cuisine type: {restaurant?.cuisine_type}</p>
                    <p>Restaurant vegetarian friendly?: {restaurant?.is_vegetarian_friendly === true ? 'Yes': 'No'}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants/${restaurantId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants/${restaurantId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};