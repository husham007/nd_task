# This is a sample Python script.

import math


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y


class LinkStation:
    def __init__(self, loc_x, loc_y, reach):
        self.locX = loc_x
        self.locY = loc_y
        self.reach = reach

    def power(self, point_x, point_y):
        distance = self.distance(point_x, point_y)

        if distance > self.reach:
            return 0
        else:
            return (self.reach - distance) ** 2

    def distance(self, point_x, point_y):
        return math.sqrt(((self.locX - point_x) ** 2) + ((self.locY - point_y) ** 2))


class LinkSelector:
    def __init__(self, stations, points):
        self.stations = [LinkStation(station[0], station[1], station[2]) for station in stations]
        self.points = [Point(point[0], point[1]) for point in points]

        self.distanceMap = {}

    def find_suitable(self):
        for point in self.points:
            for station in self.stations:
                if point not in self.distanceMap:
                    self.distanceMap[point] = station.power(point.x, point.y), station

                else:
                    power = station.power(point.x, point.y)
                    if power > self.distanceMap[point][0]:
                        self.distanceMap[point] = power, station

            # if power at point is 0
            if self.distanceMap[point][0] == 0:
                print('No link station within reach for point %i,%i' % (point.x, point.y))
            else:
                print('Best link station for point %i,%i is %i,%i with power %f”' %
                      (point.x, point.y, self.distanceMap[point][1].locX, self.distanceMap[point][1].locY,
                       self.distanceMap[point][0]))


if __name__ == '__main__':
    STATIONS = [[0, 0, 10], [20, 20, 5], [10, 0, 12]]
    POINTS = [(0, 0), (100, 100), (15, 10), (18, 18)]
    selector = LinkSelector(STATIONS, POINTS)

    selector.find_suitable()
