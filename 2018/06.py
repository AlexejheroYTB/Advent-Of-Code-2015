data = """124, 262
182, 343
79, 341
44, 244
212, 64
42, 240
225, 195
192, 325
192, 318
42, 235
276, 196
181, 262
199, 151
166, 214
49, 81
202, 239
130, 167
166, 87
197, 53
341, 346
235, 241
99, 278
163, 184
85, 152
349, 334
175, 308
147, 51
251, 93
163, 123
151, 219
162, 107
71, 58
249, 293
223, 119
46, 176
214, 140
80, 156
265, 153
92, 359
103, 186
242, 104
272, 202
292, 93
304, 55
115, 357
43, 182
184, 282
352, 228
267, 147
248, 271""".splitlines()


class Point:
    def __init__(self, x, y):
        self.x = int(x)
        self.y = int(y)
        self.ok = True
        self.count = 0

    def distance(self, x, y):
        return abs(self.x - x) + abs(self.y - y)


points = [Point(line.split(", ")[0], line.split(", ")[1]) for line in data]


def part1():
    for i in range(1000):
        for j in range(1000):

            min_dist = 999999
            closest_points = []
            for point in points:
                dist = point.distance(i, j)
                if dist < min_dist:
                    min_dist = dist
                    closest_points = [point]
                elif dist == min_dist:
                    closest_points.append(point)

            if len(closest_points) == 1:
                if i != 0 and i != 999 and j != 0 and j != 999:
                    closest_points[0].count += 1
                else:
                    closest_points[0].ok = False

    largest_point = None
    for point in points:
        if not point.ok:
            continue

        if largest_point is None or point.count > largest_point.count:
            largest_point = point

    print("Part 1:", largest_point.count)


def part2():
    ok = 0

    for i in range(1000):
        for j in range(1000):
            distance = 0
            for point in points:
                distance += point.distance(i, j)

            if distance < 10000:
                ok += 1

    print("Part 2:", ok)


part2()
