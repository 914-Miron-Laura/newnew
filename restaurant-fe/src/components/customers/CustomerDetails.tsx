import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Restaurant} from "../../models/Restaurant";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CustomerDelete } from "./CustomerDelete";
import { Customer} from "../../models/Customer";


export const CustomerDetails = () => {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState<Customer>();

	useEffect(() => {
		const fetchCustomer = async () => {
			const response = await fetch(`${BACKEND_API_URL}/customers/${customerId}`);
			const customer = await response.json();
            setCustomer(customer);
		};
		fetchCustomer();
	}, [customerId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/customers`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Customer Details</h1>
					<p>Customer first name: {customer?.first_name}</p>
					<p>Customer last name: {customer?.last_name}</p>
                    <p>Customer phone number: {customer?.phone_number}</p>
                    <p>Customer age: {customer?.age}</p>
                    <p>Customer gender: {customer?.gender}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/customers/${customerId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/customers/${customerId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};