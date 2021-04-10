#include<bits/stdc++.h>
using namespace std;

void invoke_invalid()
{
    cout << "Invalid Date\n";
}

string conv_month(int x)
{
    if(x == 1)
        return "January";
    if(x == 2)
        return "February";
    if(x == 3)
        return "March";
    if(x == 4)
        return "April";
    if(x == 5)
        return "May";
    if(x == 6)
        return "June";
    if(x == 7)
        return "July";
    if(x == 8)
        return "August";
    if(x == 9)
        return "September";
    if(x == 10)
        return "October";
    if(x == 11)
        return "November";
    if(x == 12)
        return "December";

    return "Err";
}

int main()
{
    int day, month, year;
    cin >> day >> month >> year;

    // Check date in prefered range
    if(year < 1900 || year > 2015)
    {
        invoke_invalid();
        return 0;
    }

    if(day < 1 || day > 31)
    {
        invoke_invalid();
        return 0;
    }

    if(month < 1 || month > 12)
    {
        invoke_invalid();
        return 0;
    }

    // excluding Feb
    if(month != 2)
    {
        if(month == 4 || month == 6 || month == 9 || month == 11)
        {
            if(day > 30)
            {
                invoke_invalid();
                return 0;
            }
        }
        
    }

    // case of Feb
    if(month == 2)
    {
        // Leap Year
        if((year%4 == 0 && year%100 != 0) || (year%4 == 0 && year%100 == 0 && year%400 == 0))
        {
            if(day > 29)
            {
                invoke_invalid();
                return 0;
            }
        }
        else    // normal Year
        {
            if(day > 28)
            {
                invoke_invalid();
                return 0;
            }
        }
    }

    // For a valid input date do following 

    if(day == 1)
    {
        if(month == 1)
            cout << 31 << " " << conv_month(12) << " " << year - 1 << endl;
        if(month == 3)
        {
            if((year%4 == 0 && year%100 != 0) || (year%4 == 0 && year%100 == 0 && year%400 == 0))
                cout << 29 << " " << conv_month(2) << " " << year << endl;
            else
                cout << 28 << " " << conv_month(2) << " " << year << endl;
        } 
        if(month == 2 || month == 4 || month == 6 || month == 8 || month == 9 || month == 11)
            cout << 31 << " " << conv_month(month - 1) << " " << year << endl;
        if(month == 5 || month == 7 || month == 10 || month == 12)
            cout << 30 << " " << conv_month(month - 1) <<  " " << year << endl;
    }
    else
    {
        cout << day - 1 << " " << conv_month(month) << " " << year << endl;
    }
    

    return 0;
}