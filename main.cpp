#include <vector>
#include <algorithm>
#include <iostream>
#include <string>

using namespace std;

int numPlayers(int k, vector<int> scores) {
    // Handle empty input
    if (scores.empty()) {
        return 0;
    }
    
    // Sort scores in descending order
    sort(scores.begin(), scores.end(), greater<int>());
    
    // Count players who can level up
    int count = 0;
    int currentRank = 1;
    
    for (int i = 0; i < scores.size(); i++) {
        // Players with score 0 cannot level up regardless of rank
        if (scores[i] == 0) {
            break;
        }
        
        // Assign rank based on position
        // Players with the same score share the same rank
        if (i > 0 && scores[i] != scores[i-1]) {
            currentRank = i + 1;
        }
        
        // Check if current rank is eligible to level up
        if (currentRank <= k) {
            count++;
        } else {
            break;
        }
    }
    
    return count;
}

int main() {
    // Read cutoff rank k
    int k;
    cin >> k;
    
    // Read number of players n
    int n;
    cin >> n;
    
    // Read scores
    vector<int> scores(n);
    for (int i = 0; i < n; i++) {
        cin >> scores[i];
    }
    
    // Compute and output the result
    int result = numPlayers(k, scores);
    cout << result << endl;
    
    return 0;
} 