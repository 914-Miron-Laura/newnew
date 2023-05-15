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
	Button,
	TextField,
	Pagination
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Menu } from "../../models/Menu";
import { useNavigate } from "react-router-dom";


export const AllMenus = () => {

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [menus, setMenus] = useState<Menu[]>([]);
	const [ filterName, setFilterName ] = useState("");

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/menus/`)
			.then((response) => response.json())
			.then((data) => {
				setMenus(data);
				setLoading(false);
			});
	}, []);


    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortByPrice = () => {
        const sortedMenus = [...menus].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price.toString().localeCompare(b.price.toString());
            } else {
                return b.price.toString().localeCompare(a.price.toString());
            }
        });
        setMenus(sortedMenus);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

	return (
		<Container>
			<h1>All Menus</h1>

			{loading && <CircularProgress />}
			{!loading && menus.length === 0 && <p>No menus found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/menus/add`}>
					<Tooltip title="Add a new menu" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}
          


			{!loading && (
                <Button type={"submit"} component={Link} sx={{mr : 3}} to={'menus-ordered-by-price'}>Check this statistical report by price</Button>
            )}
                
            <Button onClick={handleSortByPrice}>Sort by Price</Button>

			{!loading && menus.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="center">Chef Specialty</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Restaurant Id</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{menus.map((menu, index) => (
								<TableRow key={menu.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/menus/${menu.id}/details`} title="View menu details">
											{menu.name}
										</Link>
									</TableCell>
									<TableCell align="right">{menu.description}</TableCell>
									<TableCell align="right">{menu.price}</TableCell>
                                    <TableCell align="right">{menu.chef_specialty}</TableCell>
                                    <TableCell align="right">{menu.restaurant}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/menus/${menu.id}/details`}>
											<Tooltip title="View menu details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/menus/${menu.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/menus/${menu.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};