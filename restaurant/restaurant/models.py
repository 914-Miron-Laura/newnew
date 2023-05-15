import datetime
from django.db import models
from django.core.exceptions import ValidationError
from dataclasses import dataclass

def integer_poz_validator(value):
    if value > 0:
        return value
    else:
        raise ValidationError("This field does not accept negative values. Stay positive! :) .")


def not_current_date(value):
    current_date = datetime.date.today()
    if value.date() <= current_date:
        return value
    else:
        raise ValidationError("That time has already passed!")

def name_is_alphabetic(value):
    if value. isalpha():
        return value
    else:
        raise ValidationError("What kind of parents gave you that name!?")


def capacity_validator(value):
    if value < 30:
        return value
    else:
        raise ValidationError("We cant feed an entire african tribe!")

import re

def validate_phone_number(value):
    if not re.match(r'^\d{10}$', value):
        raise ValidationError('Phone number must be 10 digits long')
    return value


def validate_date_format(value):
    try:
        datetime.strptime(value, '%d-%m-%Y')
    except ValueError:
        raise ValidationError('The date format is: DD-MM-YYYY')
    return value


def validate_age(value):
    if not 0 <= value <= 100:
        raise ValidationError('Age must be between 0 and 100')
    return value

class Restaurant(models.Model):
   # id= models.IntegerField(primary_key=True)
    name= models.CharField(max_length=200)
    adress=models.CharField(max_length=200)
    phone_number=models.CharField(max_length=200)
    cuisine_type=models.CharField(max_length=200)
    is_vegetarian_friendly=models.BooleanField()

# one to many between menu and restaurant - one restaurant can have different menus
class Menu(models.Model):
  #  id=models.IntegerField(primary_key=True)
    description=models.CharField(max_length=200)
    price=models.IntegerField(validators=[integer_poz_validator])
    chef_specialty=models.CharField(max_length=200)
    name=models.CharField(max_length=200)
    restaurant=models.ForeignKey(Restaurant, on_delete=models.CASCADE)

class Customer(models.Model):
  #  id=models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=100,validators=[name_is_alphabetic])
    last_name=models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    age=models.IntegerField()
    gender=models.CharField(max_length=200)

# type - birthday, regular , etc
# many to many between restaurant and customer
class Reservation(models.Model):
  #  id=models.IntegerField(primary_key=True)
    customer_id=models.ForeignKey(Customer, on_delete=models.CASCADE)
    restaurant_id=models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    date= models.DateTimeField(validators=[not_current_date])
    number_of_persons=models.IntegerField(validators=[capacity_validator])
    type=models.CharField(max_length=200)

class MenuPriceDto:
    def __init__(self,restaurant_id, average_price):
        self.restaurant_id=restaurant_id
        self.average_price=average_price


@dataclass
class ReservationDto:
    customer_name: str
    restaurant_name: str
    date: object
    number_of_persons: int
    type: str
#    customer_id: int
#    restaurant_id: int

@dataclass
class RestaurantDto:
    id: int
    name: str
    adress: str
    phone_number: str
    cuisine_type: str
    is_vegetarian_friendly: bool
    reservation_counter: int

@dataclass
class CustomerDto:
    id: int
    first_name: str
    last_name: str
    phone_number: str
    age: int
    gender: str
    reservation_counter: int