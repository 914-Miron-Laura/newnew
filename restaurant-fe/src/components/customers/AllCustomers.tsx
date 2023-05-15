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
import { Customer} from "../../models/Customer";
import {useNavigate, useParams} from "react-router-dom";
import { getRandomValues, randomInt } from "crypto";


export const AllCustomers = () => {

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [ filterName, setFilterName ] = useState("");
	const { page } = useParams();

    const [currentPage, setCurrentPage] = useState(Number(page) || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);

	const filterByValue = (value: number): Customer[] => {
		return customers.filter(customer => customer?.age === value)
	  }
	const handleFilterByValue = (value: number) => {
		const filtered = filterByValue(value)
		setCustomers(filtered)
	  }
	

	
	// useEffect(() => {
	// 	setLoading(true);
	// 	fetch(`${BACKEND_API_URL}/customers/`)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setCustomers(data);
	// 			setLoading(false);
	// 		});
	// }, []);
	useEffect(() => {
        setLoading(true);
        try{
            fetch(`${BACKEND_API_URL}/customers/page/${currentPage}`)
                .then((response) => response.json())
                .then((data) => {
					console.log(data); 
                    setCustomers(data?.customers);
                    setTotalPages(data["total_pages"]);
                    setPageSize(data["items_per_page"]);
                    setLoading(false);
                })
        }
        catch (error){
            console.log(error);
        }
    }, [currentPage]);


	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortByName = () => {
        const sortedCustomers = [...customers].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.first_name.localeCompare(b.first_name);
            } else {
                return b.first_name.localeCompare(a.first_name);
            }
        });
        setCustomers(sortedCustomers);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
    const filterByName = (searchString: string): Customer[] => {
        return customers.filter(customer => customer?.first_name.toLowerCase().includes(searchString.toLowerCase()))
    }

	const handleChange = (event: any) => {
		setFilterName(event.target.value)
	}
	const getPaginationCounts = (currentPage: number) => {
        let boundaryCount = 5;
        let siblingCount;

        switch (currentPage) {
            case 1:
                siblingCount = 0;
                break;
            case 2:
                siblingCount = 0;
                break;
            case 3:
                siblingCount = 1;
                break;
            case 4:
                siblingCount = 1;
                break;
            case 5:
                siblingCount = 2;
                break;
            case 6:
                siblingCount = 2;
                break;
            case 7:
                siblingCount = 3;
                break;
            case 8:
                siblingCount = 3;
                break;
            case 9:
                siblingCount = 4;
                break;
            case 10:
                siblingCount = 4;
                break;
            default:
                siblingCount = 5
                break;
        }

        return { boundaryCount, siblingCount };
    };

    const { boundaryCount, siblingCount } = getPaginationCounts(currentPage);
	
	return (
		<Container>
			<h1>All Customers</h1>

			<div style={{
				marginTop: '20px'
			}}>
				<Button 
					onClick = {() => navigate("/customers-ordered-by-name")}
					style={{
						border: '2px solid blue',
						marginRight: '10px',
					}}
					>
					Customers ordered by Name
				</Button>
				<Button 
					onClick = {() => navigate("/customers-ordered-by-vegetarian")}
					style={{
						border: '2px solid blue',
					}}
					>
					Vegetariant Restaurants
				</Button>
			</div>
			<button onClick={() => handleFilterByValue(10)}>Filter by value 1</button>

			{loading && <CircularProgress />}
			{!loading && customers.length === 0 && <p>No customers found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/customers/add`}>
					<Tooltip title="Add a new customer" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}

			<div>
				<TextField
					value={filterName}
					label="Search by Name"
					onChange={handleChange}
				>
				</TextField>
			</div>

			<Button onClick={handleSortByName}>Sort by Name</Button>

			{!loading && customers.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">First Name</TableCell>
								<TableCell align="right">Last Name</TableCell>
								<TableCell align="right">Phone number</TableCell>
								<TableCell align="center">Age</TableCell>
								<TableCell align="center">Gender</TableCell>
								<TableCell align="center">Reservation Count</TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						{!filterName ? 
						(
						<TableBody>
							{customers.map((customer, index) => (
								<TableRow key={customer.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/customers/${customer.id}/details`} title="View customer
                                     details">
											{customer.first_name}
										</Link>
									</TableCell>
									<TableCell align="right">{customer.last_name}</TableCell>
									<TableCell align="right">{customer.phone_number}</TableCell>
									<TableCell align="right">{customer.age}</TableCell>
									<TableCell align="right">{customer.gender}</TableCell>
									<TableCell align="right">{Math.round(Math.random())}</TableCell>

									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/customers/${customer.id}/details`}>
											<Tooltip title="View customer details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/customers/${customer.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/customers/${customer.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						)
						: 
						(
						<TableBody>
						{filterByName(filterName).map((customer, index) => (
							<TableRow key={customer.id}>
								<TableCell component="th" scope="row">
									{index + 1}
								</TableCell>
								<TableCell component="th" scope="row">
									<Link to={`/customers/${customer.id}/details`} title="View customer
								 details">
										{customer.first_name}
									</Link>
								</TableCell>
								<TableCell align="right">{customer.last_name}</TableCell>
								<TableCell align="right">{customer.phone_number}</TableCell>
								<TableCell align="right">{customer.age}</TableCell>
								<TableCell align="right">{customer.gender}</TableCell>
								<TableCell align="right">{Math.random().toFixed(2)}</TableCell>
								<TableCell align="right">
									<IconButton
										component={Link}
										sx={{ mr: 3 }}
										to={`/customers/${customer.id}/details`}>
										<Tooltip title="View customer details" arrow>
											<ReadMoreIcon color="primary" />
										</Tooltip>
									</IconButton>

									<IconButton component={Link} sx={{ mr: 3 }} to={`/customers/${customer.id}/edit`}>
										<EditIcon />
									</IconButton>

									<IconButton component={Link} sx={{ mr: 3 }} to={`/customers/${customer.id}/delete`}>
										<DeleteForeverIcon sx={{ color: "red" }} />
									</IconButton>
								</TableCell>
							</TableRow>
						))}

					</TableBody>) }
					</Table>
				</TableContainer>
			)}
			<Pagination
					count={totalPages}
					page={currentPage}
					onChange={(event, value) => {
						setCurrentPage(value);
						navigate(`/customers/page/${value}`);
						}
					}
					boundaryCount={boundaryCount}
					siblingCount={siblingCount}
					showFirstButton
					showLastButton
				/>
		</Container>
	);
};