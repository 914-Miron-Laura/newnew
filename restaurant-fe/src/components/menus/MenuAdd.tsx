import { Menu} from "../../models/Menu";
import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios, { AxiosError } from "axios";
import { debounce } from "lodash";
import { useCallback } from "react";


export const MenuAdd = () => {
	const navigate = useNavigate();

	const [menu, setMenu] = useState<Menu>({
        description: "",
        price: 1,
        chef_specialty: "",
        name: "",
        restaurant: 1,
	});

    const[menus, setMenus] = useState<Menu[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Menu[]>(
				`${BACKEND_API_URL}/menus/filter/${query}`
			);
			const data = await response.data;
			setMenus(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);



	const addMenu= async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/menus/`, menu);
			navigate("/menus");
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
   

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/menus`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addMenu}>
						<TextField
							id="desription"
							label="Description"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setMenu({ ...menu, description: event.target.value })}
						/>
						<TextField
							id="price"
							label="Price"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setMenu({ ...menu, price: Number( event.target.value) })}
						/>
                        <TextField
							id="chef_specialty"
							label="Chef Specialty"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setMenu({ ...menu, chef_specialty: event.target.value })}
						/>
                        <TextField
							id="name"
							label="nAME"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setMenu({ ...menu, name: event.target.value })}
						/>

                        <Autocomplete
							id="restaurant"
							options={menus}
							getOptionLabel={(option) => `${option.description} - ${option.name}`}
							renderInput={(params) => <TextField{...params} label="Restaurant" variant="outlined" />}
							filterOptions={(options, state) => options.filter((option:Menu) => option.name.toLowerCase().includes(state.inputValue.toLowerCase()))}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setMenu({ ...menu, restaurant: value.id });
								}
							}}
						/>
						<Button type="submit">Add Menu</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};