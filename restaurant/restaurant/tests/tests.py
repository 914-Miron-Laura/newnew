from rest_framework.test import APIClient
from restaurant.models import Restaurant, Customer
from restaurant.serializers import RestaurantSerializer,CustomerSerializer
import unittest
from django.urls import reverse
from unittest.mock import patch

from restaurant.views import menu_statistics
from restaurant.views import *

class TestRestaurantCustomerAgeViewTestCase(unittest.TestCase):

    def setUp(self):
        self.client = APIClient()

    @patch('restaurant.models.Customer')
    def test_restaurant_customer_age_data(self,mock):
        url = reverse(menu_statistics)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        expected_data= '{"5": 50.0, "1": 122.5, "10": 125.0, "7": 140.0, "2": 300.0}'
        self.assertEqual(str(response.content,encoding = 'utf8'),expected_data)

       # self.assertEqual(response.data, expected_data)


class TestFilterCustomersTestCase(unittest.TestCase):
    def setUp(self):
        self.client = APIClient()

    @patch('restaurant.views.Customer.objects.all')
    def test_filter_customers(self, mock_all):
        customer_age=18
        response = self.client.get(f'/filter_customers/{customer_age}')
        self.assertEqual(response.status_code, 200)
        expected_data = CustomerSerializer(Customer.objects.all(), many=True).data
        self.assertEqual(response.data, expected_data)




if __name__ == '__main__':
        unittest.main()