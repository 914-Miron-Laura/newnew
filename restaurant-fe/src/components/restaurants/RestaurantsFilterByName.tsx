import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
    ListItemSecondaryAction,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../constants";
import { Restaurant} from "../../models/Restaurant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const RestaurantFilterByName = () => {
    const[loading, setLoading] = useState(true)
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
    fetch(`${BACKEND_API_URL}/restaurants`)
        .then(res => res.json())
        .then(data => {setRestaurants(data); setLoading(false);})
    }, []);

    
    return (
    <Container>
        <IconButton component={Link} sx={{ float: 'left'}} to={`/restaurants`}>
            <ArrowBackIcon />
        </IconButton>{""}

        <h1 style={{marginTop:"65px"}}>All restaurants ordered by name</h1>

        {loading && <CircularProgress />}

        {!loading && restaurants.length == 0 && <div>No restaurants found</div>}

        {!loading && restaurants.length > 0 && (

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Restaurant Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Restaurant Address</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Restaurant Phone Number</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Cuisine Type</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Vegetarian Friendly</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurants.map((restaurants:Restaurant, index) => (
                            <TableRow key={restaurants.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{restaurants.name}</TableCell>
                                <TableCell align="center">{restaurants.adress}</TableCell>
                                <TableCell align="center">{restaurants.phone_number}</TableCell>
                                <TableCell align="center">{restaurants.cuisine_type}</TableCell>
                                <TableCell align="center">{restaurants.is_vegetarian_friendly === true ?  'Yes' : 'No'}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
        )
        }
    </Container>
        
    );       
};