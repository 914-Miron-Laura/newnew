"""restaurant URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from restaurant import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("restaurants/",views.restaurant_list),
    path("restaurants/<int:id>/",views.restaurant_details),
    path("menus/",views.menu_list),
    path("menus/<int:id>",views.menu_details),
    path("customers/",views.customers_list),
    path("customers/<int:id>",views.customer_details),
    path("reservations/",views.reservations_list),
    path("reservations/<int:id>",views.reservation_details),
    path("filter_customers/<int:customer_age>",views.filter_customers),
    path("rest_statistics/",views.most_customers_restaurant),
    path("restaurants_menu/<int:id>",views.restaurant_menu),
    path("restaurant/add_multiple/", views.post),
    path("statistics/",views.menu_statistics),
    path("statistics/",views.menu_statistics) ,
    path("restaurants/<int:pk>/menus/",views.MenuRestaurantView.as_view()),
    path('restaurants-ordered-by-name', views.FilterName.as_view()),
    path('restaurants-ordered-by-vegetarian-friendly', views.FilterRestaurantFriendly.as_view()),
    path('menus/menus-ordered-by-price', views.FilterMenus.as_view()),  
    path("restaurants/filter/<name>",views.filter_restaurants),
    path("customers/filter/<int:age>",views.filter_customer),
    path('customers/page/<int:page>/', views.get_customers_pagination, name='customers_pagination'),
    path('restaurants/page/<int:page>/', views.get_restaurants_pagination, name='restaurants_pagination'),
    path('reservations/page/<int:page>/', views.get_reservations_pagination, name='reservations_pagination'),
 ]
