from random import *

def main():
    places = ["CIRCA at Clarendon", "Giant Food", "Lyon Hall", "Green Pig Bistro", "The Cheesecake Factory", "Whole Food Markets", "The Container Store", "Mr Tire Auto Service Centers", "Arlington Rooftop Bar & Grill", "Cava Mezze Clarendon"]
   
    for _ in range(3):
        num = randint(0, 7)
        for i in range(num):
            date = ""
            year = randint(2017, 2018)
            print(places[randint(0, 9)])
            
        print("")    

if __name__ == "__main__":
    main()