#include <fstream>
#include <iostream>
using namespace std;

int main()
{
	for (int noun = 0; noun <= 99; noun++) {
		for (int verb = 0; verb <= 99; verb++) {
			ifstream fin("data.txt");
			int v[1000], l = 0;

			while (fin >> v[l]) l++;

			v[1] = noun;
			v[2] = verb;

			int i = 0;
			while (i < l) {
				switch (v[i]) {
				case 1:
					v[v[i + 3]] = v[v[i + 1]] + v[v[i + 2]];
					i += 4;
					break;
				case 2:
					v[v[i + 3]] = v[v[i + 1]] * v[v[i + 2]];
					i += 4;
					break;
				case 99:
					goto end;
				default:
					cout << "ERROR! ENCOUNTERED INVALID OPCODE " << v[i] << "\n\n";
					goto end;
				}
			}

		end:
			//for (int i = 0; i < l; i++) {
			//	cout << v[i] << " ";
			//}

			if (v[0] == 19690720) cout << noun << " + " << verb << " - " << v[0] << " (CORRECT)\n";

			fin.close();
		}
	}

}
