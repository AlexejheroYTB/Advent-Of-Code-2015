#include <fstream>
#include <iostream>
using namespace std;

int main()
{
	ifstream fin("data.txt");
	int x, total = 0;
	while (fin >> x) {
		int mass = x / 3 - 2;
		while (mass > 0) {
			total += mass;
			mass = mass / 3 - 2;
		}
	}
	cout << total;
}
