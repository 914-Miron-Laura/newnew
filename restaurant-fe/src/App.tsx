import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import { AllRestaurants } from './components/restaurants/AllRestaurants';
import {RestaurantAdd} from "./components/restaurants/RestaurantAdd";
import {RestaurantDelete} from "./components/restaurants/RestaurantDelete"
import {RestaurantDetails} from "./components/restaurants/RestaurantDetails"
import {UpdateRestaurant} from "./components/restaurants/RestaurantUpdate"
import { RestaurantFilterByName } from './components/restaurants/RestaurantsFilterByName';
import { RestaurantFilterByVegetarian } from './components/restaurants/RestaurantsFilterByVegetarian';
import { AllCustomers } from './components/customers/AllCustomers';
import  {CustomerAdd} from "./components/customers/CustomerAdd";
import  {CustomerDelete} from "./components/customers/CustomerDelete";
import { CustomerDetails } from './components/customers/CustomerDetails';
import { UpdateCustomer } from './components/customers/CustomerUpdate';
import { AllMenus } from './components/menus/AllMenus';
import {MenuAdd} from "./components/menus/MenuAdd";
import { MenuDelete } from './components/menus/MenuDelete';
import { MenuDetails } from './components/menus/MenuDetails';
import { UpdateMenu } from './components/menus/MenuUpdate';
import { AllReservations} from './components/reservations/AllReservations';
import { ReservationAdd } from './components/reservations/ReservationAdd';
import {ReservationDelete} from "./components/reservations/ReservationDelete"
import { ReservationDetails } from './components/reservations/ReservationDetails';
import { UpdateReservation } from "./components/reservations/ReservationUpdate";

function App() {

  return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/restaurants" element={<AllRestaurants />} />
					<Route path="/restaurants/add" element={<RestaurantAdd />} />
					<Route path="/restaurants/:restaurantId/details" element={<RestaurantDetails />} />
					<Route path="/restaurants/:RestaurantId/delete" element={<RestaurantDelete />} />
					<Route path="/restaurants/:restaurantId/edit" element={<UpdateRestaurant/>} />
					<Route path="/restaurants-ordered-by-name" element={<RestaurantFilterByName />} />
					<Route path="/restaurants-ordered-by-vegetarian" element={<RestaurantFilterByVegetarian />} />
					<Route path="/restaurants/page/:page" element={<AllRestaurants/>} />
					<Route path="/" element={<AppHome />} />
					<Route path="/customers" element={<AllCustomers />} />
					<Route path="/customers/page/:page" element={<AllCustomers />} />
					<Route path="/customers/add" element={<CustomerAdd />} />
					<Route path="/customers/:CustomerId/delete" element={<CustomerDelete />} />
					<Route path="/customers/:customerId/details" element={<CustomerDetails />} />
					<Route path="/customers/:customerId/edit" element={<UpdateCustomer/>} />
					{/* <Route path="/" element={<AppHome />} />
					<Route path="/menus" element={<AllMenus />} />
					<Route path="/menus/add" element={<MenuAdd />} />
					<Route path="/menus/:MenuId/delete" element={<MenuDelete />} />
					<Route path="/menus/:MenuId/details" element={<MenuDetails />} />
					<Route path="/menus/:MenuId/edit" element={<UpdateMenu/>} /> */}
					<Route path="/" element={<AppHome />} />
					<Route path="/reservations" element={<AllReservations />} />
					<Route path="/reservations/add" element={<ReservationAdd />} />
					<Route path="/reservations/:ReservationId/delete" element={<ReservationDelete />} />
					<Route path="/reservations/:reservationId/details" element={<ReservationDetails />} />
					<Route path="/reservations/:reservationId/edit" element={<UpdateReservation />} />
					<Route path="/reservations/page/:page" element={<AllReservations/>} />
				</Routes>
			</Router> 
		</React.Fragment>
	);
}

export default App;