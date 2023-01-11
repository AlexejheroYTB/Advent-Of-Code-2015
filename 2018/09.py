class Marble:
    def __init__(self, num):
        self.prev = self
        self.next = self
        self.num = num

    def insert_after(self, other):
        other.next = self.next
        other.prev = self
        self.next.prev = other
        self.next = other

    def insert_before(self, other):
        other.prev = self.prev
        other.next = self
        self.prev.next = other
        self.prev = other

    def remove_self(self):
        self.prev.next = self.next
        self.next.prev = self.prev


def print_marbles():
    global current_marble
    printing = current_marble

    while printing.num != 0:
        printing = printing.prev

    if current_marble.num == printing.num:
        print("({})".format(printing.num), end=" ")
    else:
        print(printing.num, end=" ")
    printing = printing.next

    while printing.num != 0:
        if current_marble.num == printing.num:
            print("({})".format(printing.num), end=" ")
        else:
            print(printing.num, end=" ")
        printing = printing.next

    print()


num_players = 418
last_marble_to_place = 7133900

current_player = 0
scores = [0 for _ in range(num_players)]

next_marble_to_place = 1
current_marble = Marble(0)

while next_marble_to_place < last_marble_to_place:
    if next_marble_to_place % 23 != 0:
        new_marble = Marble(next_marble_to_place)
        current_marble.next.insert_after(new_marble)
        current_marble = new_marble
    else:
        scores[current_player] += next_marble_to_place
        seven_behind_marble = current_marble.prev.prev.prev.prev.prev.prev.prev
        seven_behind_marble.remove_self()
        current_marble = seven_behind_marble.next
        scores[current_player] += seven_behind_marble.num

    if next_marble_to_place == (last_marble_to_place / 100):
        print("Part 1:", max(scores))

    next_marble_to_place += 1
    current_player += 1
    if current_player == num_players:
        current_player = 0

    # print_marbles()

print("Part 2:", max(scores))
