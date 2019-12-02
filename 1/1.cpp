#include <fstream>
#include <iostream>
using namespace std;

int main()
{
	ifstream fin("data.txt");
	char s[7030];
	int f = 0;
	fin.get(s, 7030);

	for (unsigned int i = 0; i < strlen(s); i++) {
		if (s[i] == '(') f++;
		else f--;

		cout << f << "\n";
		if (f == -1) {
			cout << i + 1;
			return 0;
		}
	}
}
