import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Restaurant } from "../../models/Restaurant";
import { useEffect, useState } from "react";
import { Menu } from "../../models/Menu";
import { MenuDetails} from "./MenuDetails";


export const UpdateMenu = () => {
    const { menuId } = useParams();
    const navigate = useNavigate();
    const [ menuDetails, setMenuDetails ] = useState<Menu>();
    

    const fetchMenu = async () => {
        const response = await fetch(`${BACKEND_API_URL}/menus/${menuId}`);
        const restaurant = await response.json();
        setMenuDetails(menu);
    };

    useEffect(() => {
         fetchMenu()
    }, [menuId])


    const [menu, setMenu] = useState<Menu>({
        id: parseInt(String(menuId)),
        description: "",
        price: 1,
        chef_specialty: "",
        name: "",
        restaurant:1 ,
    });

    const UpdateMenu= async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/menus/${menuId}`, menu);
            navigate("/menus");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/menus");
    };

    console.log('menuId', menuDetails)

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/menus`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={UpdateMenu} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                              Description
                            </FormLabel>
                            <TextField
                                required
                                id="description"
                                variant="outlined"
                                defaultValue={menuDetails?.description}
                                onChange={(event) => setMenu({ ...menu, description: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Price
                            </FormLabel>
                            <TextField
                                required
                                id="price"
                                variant="outlined"
                                defaultValue={menuDetails?.price}
                                onChange={(event) => setMenu({  ...menu, price: Number(event.target.value) })}
                            />
                        </Container>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Chef Specialty
                            </FormLabel>
                            <TextField
                                required
                                id="chef_specialty"
                                variant="outlined"
                                defaultValue={menuDetails?.chef_specialty}
                                onChange={(event) => setMenu({ ...menu, chef_specialty: event.target.value })}
                            />
                        </Container>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Name
                            </FormLabel>
                            <TextField
                                required
                                id="name"
                                variant="outlined"
                                defaultValue={menuDetails?.name}
                                onChange={(event) => setMenu({ ...menu, name: event.target.value })}
                            />
                        </Container>
                    
                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={UpdateMenu} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}