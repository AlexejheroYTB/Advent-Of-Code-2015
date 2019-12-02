#include <fstream>
#include <iostream>
using namespace std;

int v[10000][10000];

int main()
{
	ifstream fin("data.txt");
	char s[10000];
	fin.get(s, 10000);
	int x = 5000, y = 5000, rx = 5000, ry = 5000, t = 1;
	v[x][y]++;
	for (int i = 0; i < (int)strlen(s); i++) {
		if (i % 2 == 0) {
			switch (s[i]) {
			case '^':
				x++;
				//cout << "Santa moved north!\n";
				break;
			case '>':
				y--;
				//cout << "Santa moved east!\n";
				break;
			case 'v':
				x--;
				//cout << "Santa moved south!\n";
				break;
			case '<':
				y++;
				//cout << "Santa moved west!\n";
				break;
			}
			v[x][y]++;
			if (v[x][y] == 1) t++;
		}
		else {
			switch (s[i]) {
			case '^':
				rx++;
				//cout << "Robo-Santa moved north!\n";
				break;
			case '>':
				ry--;
				//cout << "Robo-Santa moved east!\n";
				break;
			case 'v':
				rx--;
				//cout << "Robo-Santa moved south!\n";
				break;
			case '<':
				ry++;
				//cout << "Robo-Santa moved east!\n";
				break;
			}
			v[rx][ry]++;
			if (v[rx][ry] == 1) t++;
		}
	}
	cout << t;
	return 0;
}