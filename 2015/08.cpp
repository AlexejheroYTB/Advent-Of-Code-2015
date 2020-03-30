#include <cstring>
#include <fstream>
#include <iostream>
using namespace std;

int main()
{
	ifstream fin("data.txt");
	char s[1000];

	int total = 0;

	while (fin.getline(s, 1000)) {
		total += 2;
		for (int i = 0; i < strlen(s); i++) {
			if (strchr("\"\\", s[i])) total++;
		}
	}
	
	cout << total;
}