// some facts:

// k e N
// there are 9 * 10^(k - 1) unique invalid ids
// of length n = 2k

// how many are > C = cc = (c)
// how many less than C?
// C is a numeric string of length n = 2k
// there are 9 * 10^(k - 1) - c invalid ids greater than C with length n
// there are c invalid ids less than C
//
// now, their sums
//
// the sum of all invalid ids of length n = 2k is:
// k(k + 1)/2 * 10^k + k(k + 1)/2 <-- this was copied down wrong entirely
// should be more like...
// it's the sum of all numbers from 10^k to 10^k+1 - 1 times (10^k + 1)
// or |:
//
// x = 10^k, y = 10^k+1 - 1
// sum(x -> y) = y(y + 1)/2 - x(x + 1)/2  = (10^(k + 1) - 1)(10^(k + 1))/2 - (10^k(10^k + 1))/2
//
// example: for n = 4, k = 2, and the sum we want is
// [100, 999]
// which is the same as: 999(1000)/2 - 100(101)/2 = (999(1000) - 100(101)) / 2
// and to find a partial sum, say
// [200, 995]
// this is the same as [100, 999] - [100, 200] - [995, 999]

// what about all those greater than C, less than C?
// same question really
// less than C is probably the easiest to work with
// the sum of all invalid ids C = (c) of length n = 2k where C >= K = (k)
// find boundary, subtract appropriately, profit
/*

suppose:

k = 1, n = 2, K = 77

so we want
11 + 22 + 33 + 44 + 55 + 66 + 77 = 1+2+3+4+5+6+7 * 10 + 1+2+3+4+5+6+7
= S(7) * 10 + S(7)

S(n) = n(n+1)/2

*/
//
// note there are simply no invalid ids with an odd length

// SO!
// given a range
