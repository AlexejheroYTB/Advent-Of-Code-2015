#include <iostream>
#include <string>
#include <stdlib.h>
using namespace std;

int grid[10000][10000];

int getValueToWrite(int x, int y) {
    int value = grid[x][y-1] + grid[x][y+1] + grid[x-1][y-1] + grid[x-1][y] + grid[x-1][y+1] + grid[x+1][y-1] + grid[x+1][y] + grid[x+1][y+1];
    if (value > 368078) {
        cout << value << endl;
        exit(0);
    }
    return value;
}

int main()
{
    for (int i = 0; i < 10000; i++) {
        for (int j = 0; j < 10000; j++) {
            grid[i][j] = 0;
        }
    }
    
    grid[4999][4999] = 1;
    grid[5000][4999] = 1;
    
    int step = 2;
    int x = 5000;
    int y = 4999;
    int lastRule = 0;
    
    while (true) {
        step++;
        
        switch (lastRule) {
            case 0: // Go up if can't go left
                if (grid[x-1][y] != 0) {
                    y++;
                    grid[x][y] = getValueToWrite(x,y);
                } else {
                    x--;
                    grid[x][y] = getValueToWrite(x,y);
                    lastRule = 1;
                }
                break;
                
            case 1: // Go left if can't go down
                if (grid[x][y-1] != 0) {
                    x--;
                    grid[x][y] = getValueToWrite(x,y);
                } else {
                    y--;
                    grid[x][y] = getValueToWrite(x,y);
                    lastRule = 2;
                }
                break;
                
            case 2: // Go down if can't go right
                if (grid[x+1][y] != 0) {
                    y--;
                    grid[x][y] = getValueToWrite(x,y);
                } else {
                    x++;
                    grid[x][y] = getValueToWrite(x,y);
                    lastRule = 3;
                }
                break;
                
            case 3: // Go right if can't go up
                if (grid[x][y+1] != 0) {
                    x++;
                    grid[x][y] = getValueToWrite(x,y);
                } else {
                    y++;
                    grid[x][y] = getValueToWrite(x,y);
                    lastRule = 0;
                }
                break;
        }
    }
    
    cout << 4999 - x + 4999 - y;
}
