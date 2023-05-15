from restaurant.models import Restaurant,Menu,Customer,Reservation
from rest_framework.decorators import api_view
from restaurant.serializers import RestaurantSerializer,MenuSerializer,CustomerSerializer,ReservationSerializer, MyRestaurantSerializer,Lab4Serializer
from rest_framework.response import Response
from django.http import  JsonResponse
from rest_framework import status,generics
from django.db.models import Avg,Count
from dataclasses import asdict
from django.shortcuts import get_object_or_404
from .models import Restaurant, Menu,MenuPriceDto, ReservationDto, RestaurantDto, CustomerDto
from django.core.exceptions import ValidationError
from django.http import Http404
from django.forms import model_to_dict
from rest_framework.views import APIView
from django.db.models import Avg, Count, Max, Min

@api_view(['GET'])
def home_page(request):
    if request.method == 'GET':
        text= {"Hi there" : "Welcome to home page " }
        return Response(text.items())

@api_view(['GET','POST'])
def restaurant_list(request):
    if request.method == 'GET':
        restaurants= Restaurant.objects.all()

        restaurant_dtos = []
        for restaurant in restaurants:

            filters = Reservation.objects.filter(restaurant_id=restaurant.id)
            count=len(filters)
            restaurant_dtos.append(
                asdict(
                    RestaurantDto(
                        id=restaurant.id,
                        name=restaurant.name,
                        adress=restaurant.adress,
                        phone_number=restaurant.phone_number,
                        cuisine_type=restaurant.cuisine_type,
                        is_vegetarian_friendly=restaurant.is_vegetarian_friendly,
                        reservation_counter=count
                    )
                )
            )
        return Response(restaurant_dtos)

    if request.method== 'POST':
        serializer=RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT','DELETE'])
def restaurant_details(request,id):
    try:
        restaurant = Restaurant.objects.get(pk=id)
    except Restaurant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RestaurantSerializer(restaurant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def menu_list(request):
    if request.method == 'GET':
        menu= Menu.objects.all()
        serializer= MenuSerializer(menu,many=True)
        return Response(serializer.data)

    if request.method== 'POST':
        serializer=MenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response("laura")

@api_view(['GET','PUT','DELETE'])
def menu_details(request,id):
    try:
        menu =Menu.objects.get(pk=id)
    except Menu.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MenuSerializer(menu)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = MenuSerializer(menu, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        menu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def customers_list(request):
    if request.method == 'GET':
        customers= Customer.objects.all()

        customer_dtos = []
        for customer in customers:

            filters = Reservation.objects.filter(customer_id=customer.id)
            count=len(filters)
            customer_dtos.append(
                asdict(
                    CustomerDto(
                        id=customer.id,
                        first_name=customer.first_name,
                        last_name=customer.last_name,
                        phone_number=customer.phone_number,
                        age=customer.age,
                        gender=customer.gender,
                        reservation_counter=count
                    )
                )
            )

        return Response(customer_dtos)

    if request.method== 'POST':
        serializer=CustomerSerializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as ve:
                return Response(str(ve))

@api_view(['GET','PUT','DELETE'])
def customer_details(request,id):
    try:
        customer= Customer.objects.get(pk=id)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def reservations_list(request):
    if request.method == 'GET':
        reservations= Reservation.objects.all()
        reservations_dto = []
        for reservation in reservations:
            dto = ReservationDto(
                    customer_name=reservation.customer_id.first_name,
                    restaurant_name=reservation.restaurant_id.name,
                    date=reservation.date,
                    number_of_persons=reservation.number_of_persons,
                    type=reservation.type
                )
            reservations_dto.append(asdict(dto))
        return Response(reservations_dto)

    if request.method== 'POST':
        serializer=ReservationSerializer(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as ve:
            return Response(str(ve))
        

@api_view(['GET','PUT','DELETE'])
def reservation_details(request,id):
    try:
        reservation = Reservation.objects.get(pk=id)
        
    except Reservation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        reservation_dto = ReservationDto(
            customer_name=reservation.customer_id.first_name,
            restaurant_name=reservation.restaurant_id.name,
            date=reservation.date,
            number_of_persons=reservation.number_of_persons,
            type=reservation.type
        )
        return Response(asdict(reservation_dto))
    elif request.method == 'PUT':
        serializer = ReservationSerializer(reservation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        reservation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def filter_customers(request,customer_age,format=None):

    if request.method=='GET':
        customers_list=[]
        customers = Customer.objects.all()
        for customer in customers:
            my_model_instance = Customer.objects.get(id=customer.id)
            my_field_value = my_model_instance.age
            if my_field_value > customer_age:
               customers_list.append(customer)
        serializer = CustomerSerializer(customers_list, many=True)
        return Response(serializer.data)


# all restaurants in the order of their menu prices
@api_view(['GET'])
def restaurant_customer_age_view(request):
    if request.method == 'GET':
        restaurant_price_date = (
            Menu.objects.values('restaurant__id')
                            .annotate(average_price=Avg('price'))
                            .order_by('-average_price')
        )

        restaurant_info = ""
        for restaurant in restaurant_price_date:
            restaurant_info += f"Restaurant ID: {restaurant['restaurant__id']}, Average Price: {restaurant['average_price']}                          "


        return Response(restaurant_info)

#restaurantele in ordinea nr de  customers
@api_view(['GET'])
def most_customers_restaurant(request):
    if request.method == 'GET':
        restaurant_data = (
            Reservation.objects.values( 'restaurant_id')
                .annotate(most=Count('restaurant_id'))
                .order_by('most')


        )

        restaurant_info = ""
        for restaurant in restaurant_data:
             restaurant_info += f"Restaurant ID: {restaurant['restaurant_id']}, Nr customers: {restaurant['most']}             "


        return Response(restaurant_info)


def restaurant_menu(request, id):
    if request.method == 'GET':
        restaurant = get_object_or_404(Restaurant, pk=id)
        menus = Menu.objects.filter(restaurant=restaurant)
        menu_list = []
        for menu in menus:
            menu_dict = {
                'id': menu.id,
                'description': menu.description,
                'price': menu.price,
                'chef_specialty': menu.chef_specialty,
                'name': menu.name
            }
            menu_list.append(menu_dict)
        return Response({'menus': menu_list})


# lab 4 extra !!!
@api_view(['POST'])
def post(request):
        serializer = MyRestaurantSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MenuRestaurantView(APIView):
    def get_object(self, pk):
        try:
            return Restaurant.objects.get(pk=pk)
        except Restaurant.DoesNotExist :
            raise Http404

    def get_menus(self, pk):
        try:
            return Menu.objects.get(pk=pk)
        except Menu.DoesNotExist:
            raise Http404

    def post(self, request, pk, format=None):
        brand = self.get_object(pk)
        dress_ids = request.data['list_of_ids']
        dresses = []
        for i in range(len(dress_ids)):
            dress = self.get_menus(dress_ids[i])
            print(dress.restaurant)
            dress.restaurant = brand
            dress.save()
            dresses.append(dress)

        serializer = Lab4Serializer(dresses[0], data=model_to_dict(dresses[0]))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def menu_statistics(request):
    # Calculate the average menu price for each restaurant
    menu_prices = Menu.objects.values('restaurant_id').annotate(average_price=Avg('price'))

    # Create a list of MenuPriceDto objects
    menu_price_dtos = [MenuPriceDto(price['restaurant_id'], price['average_price']) for price in menu_prices]

    # Sort the list by average menu price
    menu_price_dtos.sort(key=lambda x: x.average_price)

    # Create a dictionary representation of the MenuPriceDto objects
    menu_price_dict = {menu_price_dto.restaurant_id: menu_price_dto.average_price for menu_price_dto in menu_price_dtos}

    # Return the dictionary as a JSON response
    return JsonResponse(menu_price_dict)





class FilterName(generics.ListCreateAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        queryset = Restaurant.objects.annotate(min_name=Min('name')).order_by('min_name')
        return queryset

class FilterRestaurantFriendly(generics.ListCreateAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        queryset = Restaurant.objects.filter(is_vegetarian_friendly=True)
        return queryset



class FilterMenus(generics.ListCreateAPIView):
    serializer_class = MenuSerializer

    def get_queryset(self):
        queryset = Menu.objects.annotate(min_price=Min('price')).order_by('min_price')
        return queryset




@api_view(['GET'])
def filter_restaurants(request,name,format=None):
    if request.method=='GET':
        restaurant_list=[]
        restaurants = Restaurant.objects.all()
        for restaurant in restaurants:
            my_model_instance = Restaurant.objects.get(id=restaurant.id)
            my_field_value = my_model_instance.name
            if my_field_value > name:
               restaurant_list.append(restaurant)
        serializer = RestaurantSerializer(restaurant_list, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def filter_customer(request,age,format=None):
    if request.method=='GET':
        customer_list=[]
        customers = Customer.objects.all()
        for customer in customers:
            my_model_instance = Customer.objects.get(id=customer.id)
            my_field_value = my_model_instance.age
            if my_field_value > age:
               customer_list.append(customer)
        serializer = CustomerSerializer(customer_list, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_restaurants_pagination(request, page=1):

    restaurants = Restaurant.objects.all()

    # set the number of items per page
    items_per_page = 10

    # calculate the start and end indices for the current page
    start_index = (page - 1) * items_per_page
    end_index = start_index + items_per_page

    # slice the team members based on the start and end indices
    restaurants_slice = restaurants[start_index:end_index]

    # calculate the total number of pages
    total_pages = (restaurants.count() + items_per_page - 1) // items_per_page

    # calculate the range of pages to display in the pagination bar
    max_pages = 10 # the maximum number of pages to display in the pagination bar
    half_max_pages = max_pages // 2
    if total_pages <= max_pages:
        # if there are fewer pages than the maximum, show all of them
        page_range = range(1, total_pages + 1)
    elif page <= half_max_pages:
        # if the current page is close to the beginning, show the first max_pages pages
        page_range = range(1, max_pages + 1)
    elif page > total_pages - half_max_pages:
        # if the current page is close to the end, show the last max_pages pages
        page_range = range(total_pages - max_pages + 1, total_pages + 1)
    else:
        # otherwise, show the current page and the pages before and after it
        page_range = range(page - half_max_pages, page + half_max_pages + 1)

    # create a dictionary containing the paginated data
    data = {
        'restaurants': list(restaurants_slice.values()),
        'current_page': page,
        'total_pages': total_pages,
        'items_per_page': items_per_page,
        'page_range': list(page_range),
    }

    # return the paginated data as a JSON response
    return JsonResponse(data)


@api_view(['GET'])
def get_customers_pagination(request, page=1):

    customers = Customer.objects.all()

    # set the number of items per page
    items_per_page = 10

    # calculate the start and end indices for the current page
    start_index = (page - 1) * items_per_page
    end_index = start_index + items_per_page

    # slice the team members based on the start and end indices
    customers_slice = customers[start_index:end_index]

    # calculate the total number of pages
    total_pages = (customers.count() + items_per_page - 1) // items_per_page

    # calculate the range of pages to display in the pagination bar
    max_pages = 10 # the maximum number of pages to display in the pagination bar
    half_max_pages = max_pages // 2
    if total_pages <= max_pages:
        # if there are fewer pages than the maximum, show all of them
        page_range = range(1, total_pages + 1)
    elif page <= half_max_pages:
        # if the current page is close to the beginning, show the first max_pages pages
        page_range = range(1, max_pages + 1)
    elif page > total_pages - half_max_pages:
        # if the current page is close to the end, show the last max_pages pages
        page_range = range(total_pages - max_pages + 1, total_pages + 1)
    else:
        # otherwise, show the current page and the pages before and after it
        page_range = range(page - half_max_pages, page + half_max_pages + 1)

    # create a dictionary containing the paginated data
    data = {
        'customers': list(customers_slice.values()),
        'current_page': page,
        'total_pages': total_pages,
        'items_per_page': items_per_page,
        'page_range': list(page_range),
    }

    # return the paginated data as a JSON response
    return JsonResponse(data)



@api_view(['GET'])
def get_reservations_pagination(request, page=1):

    reservations = Reservation.objects.all()

    # set the number of items per page
    items_per_page = 10

    # calculate the start and end indices for the current page
    start_index = (page - 1) * items_per_page
    end_index = start_index + items_per_page

    # slice the team members based on the start and end indices
    reservations_slice = reservations[start_index:end_index]

    # calculate the total number of pages
    total_pages = (reservations.count() + items_per_page - 1) // items_per_page

    # calculate the range of pages to display in the pagination bar
    max_pages = 10 # the maximum number of pages to display in the pagination bar
    half_max_pages = max_pages // 2
    if total_pages <= max_pages:
        # if there are fewer pages than the maximum, show all of them
        page_range = range(1, total_pages + 1)
    elif page <= half_max_pages:
        # if the current page is close to the beginning, show the first max_pages pages
        page_range = range(1, max_pages + 1)
    elif page > total_pages - half_max_pages:
        # if the current page is close to the end, show the last max_pages pages
        page_range = range(total_pages - max_pages + 1, total_pages + 1)
    else:
        # otherwise, show the current page and the pages before and after it
        page_range = range(page - half_max_pages, page + half_max_pages + 1)

    # create a dictionary containing the paginated data
    data = {
        'reservations': list(reservations_slice.values()),
        'current_page': page,
        'total_pages': total_pages,
        'items_per_page': items_per_page,
        'page_range': list(page_range),
    }

    # return the paginated data as a JSON response
    return JsonResponse(data)
