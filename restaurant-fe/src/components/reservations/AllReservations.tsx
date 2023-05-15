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
import { Reservation } from "../../models/Reservation";
import {useNavigate, useParams} from "react-router-dom";


export const AllReservations = () => {

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const { page } = useParams();

    const [currentPage, setCurrentPage] = useState(Number(page) || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);
	
	const names = ['Vlad Stan', 'Viorel Craiut', 'Vasilica Coci', 'Irinel Columbeanu'];
	const randomIndex = Math.floor(Math.random() * names.length);


	const restaurantNames = ['Chiohhhs', 'Marhaba', 'Burger King', 'Mc', 'Pizza Hut', 'Subway', 'Dunkin\'', 'Starbucks'];
	const randomIndex2 = Math.floor(Math.random() * restaurantNames.length);







	// useEffect(() => {
	// 	setLoading(true);
	// 	fetch(`${BACKEND_API_URL}/reservations/`)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setReservations(data);
	// 			setLoading(false);
	// 		});
	// }, []);
	useEffect(() => {
        setLoading(true);
        try{
            fetch(`${BACKEND_API_URL}/reservations/page/${currentPage}`)
                .then((response) => response.json())
                .then((data) => {
					console.log(data); 
                    setReservations(data?.reservations);
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

    const handleSortByNrPersons = () => {
        const sortedReservations = [...reservations].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.number_of_persons.toString().localeCompare(b.number_of_persons.toString());
            } else {
                return b.number_of_persons.toString().localeCompare(a.number_of_persons.toString());
            }
        });
        setReservations(sortedReservations);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };



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
			<h1>All Reservations</h1>
            <Button onClick={handleSortByNrPersons}>Sort by Numer of Pers</Button>

			{loading && <CircularProgress />}
			{!loading && reservations.length === 0 && <p>No reservation found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/reservations/add`}>
					<Tooltip title="Add a new reservations" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}
          
			{!loading && reservations.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Type</TableCell>
								<TableCell align="right">Customer Name</TableCell>
								<TableCell align="center">Restaurant Name</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Number of Persons</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{reservations.map((reservation, index) => (
								<TableRow key={reservation.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/reservations/${reservation.id}/details`} title="View res details">
											{reservation.type}
										</Link>
									</TableCell>
									<TableCell align="right">{names[randomIndex]}</TableCell>
									<TableCell align="right">{restaurantNames[randomIndex]}</TableCell>
                                    <TableCell align="right">{reservation.date.toLocaleString()}</TableCell>
                                    <TableCell align="right">{reservation.number_of_persons}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/reservations/${reservation.id}/details`}>
											<Tooltip title="View reservation details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/reservations/${reservation.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/reservations/${reservation.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={(event, value) => {
						setCurrentPage(value);
						navigate(`/reservations/page/${value}`);
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