from functools import cache

grid_serial_number = 7403


@cache
def calc_power(x, y):
    rack_id = x + 10
    c_power = rack_id * y
    global grid_serial_number
    c_power += grid_serial_number
    c_power *= rack_id
    c_power = c_power // 100 % 10
    c_power -= 5
    return c_power


def calc_power_3x3(x, y):
    return calc_power(x, y) + calc_power(x+1, y) + calc_power(x+2, y) + \
        calc_power(x, y+1) + calc_power(x+1, y+1) + calc_power(x+2, y+1) + \
        calc_power(x, y+2) + calc_power(x+1, y+2) + calc_power(x+2, y+2)


@cache
def calc_power_nxn(x, y, n):
    if n == 1:
        return calc_power(x, y)

    existing_power = calc_power_nxn(x, y, n-1)

    for i1 in range(x, x+n):
        existing_power += calc_power(i1, y+n-1)

    for i2 in range(y, y+n-1):
        existing_power += calc_power(x+n-1, i2)

    return existing_power


max_power = (0, 0, 0)
for i in range(1, 299):
    for j in range(1, 299):
        power = calc_power_3x3(i, j)
        if power > max_power[0]:
            max_power = power, i, j

print("Part 1: {},{}".format(max_power[1], max_power[2]))

max_power_nxn = (0, 0, 0, 0)
for o in range(1, 301):
    for i in range(1, 301 - o):
        for j in range(1, 301 - o):
            power = calc_power_nxn(i, j, o)
            if power > max_power_nxn[0]:
                max_power_nxn = power, i, j, o
    print("{}: {},{},{}".format(o, max_power_nxn[1], max_power_nxn[2], max_power_nxn[3]))

print("Part 2: {},{},{}".format(max_power_nxn[1], max_power_nxn[2], max_power_nxn[3]))
