# from pydbgen import pydb
# import random

# db = pydb()
# n = 10  

# restaurant_types = ["italian", "spanish", "romanian", "chinese"]

# with open('populate_restaurants.csv', 'w') as f:
#     for i in range(n):
#         name = db.name()
#         address_str = db.address()
#         restaurant_type = random.choice(restaurant_types)
#         country = db.country()
#         open_now = random.choice([True, False])
#         f.write("{},{},{},{},{}\n".format(name, address_str, restaurant_type, country, open_now))

# with open('populate_customer.csv', 'w') as f:
#     for i in range(n):
#         name = db.name()
#         username = db.username()
#         phone_number = db.phone_number()
#         age = random.randint(0, 100)
#         email = db.email()
#         gender = random.choice(["Male", "Female"])
#         f.write("{},{},{},{},{},{}\n".format(name, username, phone_number, age, email, gender))

# with open('populate_reservation.csv', 'w') as f:
#     for i in range(10*n):
#         table_number = random.randint(0, 10)
#         num_seats = str(random.randint(1, 10))
#         reservation_date = db.date(start='2022-01-01', end='2023-12-31').strftime("%Y-%m-%d")
#         reservation_time = db.time().strftime("%H:%M:%S")
#         num_guests = random.randint(1, 10)
#         event_type = random.choice(["aniversary", "birthday", "engagement"])
#         f.write("{},{},'{} {}',{},'{}'\n".format(table_number, num_seats, reservation_date, reservation_time, num_guests, event_type))
