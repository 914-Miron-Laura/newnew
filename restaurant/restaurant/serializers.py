from restaurant.models import Restaurant, Customer,Reservation,Menu,ReservationDto
from rest_framework import serializers,generics
from django.db.models import Avg

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model=Restaurant
        fields=['id','name','adress','phone_number','cuisine_type','is_vegetarian_friendly']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields= ['id','first_name','last_name','phone_number','age','gender']

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reservation
        fields=['id','customer_id','restaurant_id','date','number_of_persons','type']

#class ReservationDtoSerializer(serializers.ModelSerializer):
#    class Meta:
#        model=ReservationDto
#        fields=['id','customer_name','restaurant_name','date','number_of_persons','type', 'customer_id', 'restaurant_id']

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model=Menu
        fields=['id','restaurant','description','price','chef_specialty','name']


class CustomerSerializer1(serializers.ModelSerializer):
    average_price=serializers.IntegerField(read_only=True)

    class Meta:
        model = Customer
        fields= ['id','first_name','last_name','phone_number','age','gender']

class MenuPriceViewSerializer(generics.ListCreateAPIView):

    serializer_class = CustomerSerializer1

    def get_queryset(self):
        queryset = Menu.objects.annotate(average_price=Avg('price')).order_by('-average_price')
        return queryset

### extra lab 4
class MyRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

    def create(self,validated_data):
        if isinstance(validated_data, list):
            return [self.Meta.model.objects.create(**item_data) for item_data in validated_data]

        else:
            return self.Meta.model.objects.create(**validated_data)


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional fields argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the fields argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)



class Lab4Serializer(DynamicFieldsModelSerializer):

    class Meta:
        model = Menu
        fields = ['restaurant']