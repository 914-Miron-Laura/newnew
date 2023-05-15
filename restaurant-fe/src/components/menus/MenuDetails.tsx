import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MenuDelete} from "../menus/MenuDelete";
import { Menu} from "../../models/Menu";


export const MenuDetails = () => {
    const { menuId } = useParams();
    const [menu, setMenu] = useState<Menu>();

	useEffect(() => {
		const fetchMenu = async () => {
            const response = await fetch(`${BACKEND_API_URL}/menus/${menuId}`);
			const customer = await response.json();
            setMenu(menu);
		};
		fetchMenu();
	}, [menuId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/menus`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Menu Details</h1>
					<p>Menu Description: {menu?.description}</p>
					<p>Menu Price: {menu?.price}</p>
                    <p>Menu Chef Specialty: {menu?.chef_specialty}</p>
                    <p>Menu Name: {menu?.name}</p>
                    <p>Menu Restaurant: {menu?.restaurant}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/menus/${menuId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/menus/${menuId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};