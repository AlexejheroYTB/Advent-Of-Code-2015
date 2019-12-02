#include <fstream>
#include <iostream>
using namespace std;

int v[10000][10000];

int main()
{
	ifstream fin("data.txt");
	char s[10000];
	fin.get(s, 10000);
	int x = 5000, y = 5000, t = 1;
	v[x][y]++;
	for (unsigned int i = 0; i < strlen(s); i++) {
		switch (s[i]) {
		case '^':
			y--;
		case '>':
			x++;
		case 'v':
			y++;
		case '<':
			x--;
		}
		v[x][y]++;
		if (v[x][y] == 1) t++;
	}
	cout << t;
	return 0;
}