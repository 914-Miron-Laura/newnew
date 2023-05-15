import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Restaurant } from "../../models/Restaurant";
import { useEffect, useState } from "react";
import { Customer } from "../../models/Customer";
import { CustomerDetails } from "./CustomerDetails";


export const UpdateCustomer = () => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [ customerDetails, setCustomerDetails ] = useState<Customer>();
    

    const fetchCustomer = async () => {
        const response = await fetch(`${BACKEND_API_URL}/customers/${customerId}`);
        const restaurant = await response.json();
        setCustomerDetails(customer);
    };

    useEffect(() => {
         fetchCustomer()
    }, [customerId])


    const [customer, setCustomer] = useState<Customer>({
        id: parseInt(String(customerId)),
        first_name: "",
        last_name: "",
        phone_number: "",
        age: 1,
        gender:"",
    });

    const UpdateCustomer = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/customers/${customerId}`, customer);
            navigate("/customers");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/customers");
    };

    console.log('customerId', customerDetails)

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/customers`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={UpdateCustomer} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                              First  Name
                            </FormLabel>
                            <TextField
                                required
                                id="first_name"
                                variant="outlined"
                                defaultValue={customerDetails?.first_name}
                                onChange={(event) => setCustomer({ ...customer, first_name: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Last Name
                            </FormLabel>
                            <TextField
                                required
                                id="last_name"
                                variant="outlined"
                                defaultValue={customerDetails?.last_name}
                                onChange={(event) => setCustomer({  ...customer, last_name: event.target.value })}
                            />
                        </Container>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Phone Number
                            </FormLabel>
                            <TextField
                                required
                                id="phone_number"
                                variant="outlined"
                                defaultValue={customerDetails?.phone_number}
                                onChange={(event) => setCustomer({ ...customer, phone_number: event.target.value })}
                            />
                        </Container>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Age
                            </FormLabel>
                            <TextField
                                required
                                id="age"
                                variant="outlined"
                                defaultValue={customerDetails?.age}
                                onChange={(event) => setCustomer({ ...customer, age: Number(event.target.value) })}
                            />
                        </Container>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Gender
                            </FormLabel>
                            <TextField
                                required
                                id="gender"
                                variant="outlined"
                                defaultValue={customerDetails?.age}
                                onChange={(event) => setCustomer({ ...customer, gender: event.target.value })}
                            />
                        </Container>
                       
                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={UpdateCustomer} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}