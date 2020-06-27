/*
Function name: generate(data);
"data" is an array which equals ["John","James","Smith","01-Jan-2000","M"]
Where the elements are as follows:
0 = Forename
1 = Middle Name (if any)
2 = Surname
3 = Date of Birth (In the format Day Month Year, this could include the full Month name or just shorthand ie September or Sep)
4 = M-Male or F-Female
*/

const returnMonthKeyString = monthString => {
    if (monthString === 'Jan' || monthString === 'January') return '01';
    if (monthString === 'Feb' || monthString === 'February') return '02';
    if (monthString === 'Mar' || monthString === 'March') return '03';
    if (monthString === 'Apr' || monthString === 'April') return '04';
    if (monthString === 'May' || monthString === 'May') return '05';
    if (monthString === 'Jun' || monthString === 'June') return '06';
    if (monthString === 'Jul' || monthString === 'July') return '07';
    if (monthString === 'Aug' || monthString === 'August') return '08';
    if (monthString === 'Sep' || monthString === 'September') return '09';
    if (monthString === 'Oct' || monthString === 'October') return '10';
    if (monthString === 'Nov' || monthString === 'November') return '11';
    if (monthString === 'Dec' || monthString === 'December') return '12';
};

  
 const generate = data => {
    // For rules description see appropriate page
    let rule1_5 = () => {
    
        if (data[2].length >= 5){
            return data[2].substring(0, 5).toUpperCase();
        } else {
            let actualLastNameLength = data[2].length;
            if (actualLastNameLength === 4) return (data[2][0] + data[2][1] + data[2][2] + data[2][3] + '9').toUpperCase();
            if (actualLastNameLength === 3) return (data[2][0] + data[2][1] + data[2][2] + '99').toUpperCase() ;
            if (actualLastNameLength === 2) return (data[2][0] + data[2][1] + '999').toUpperCase();
            if (actualLastNameLength === 1) return (data[2][0] + '9999').toUpperCase();
            if (actualLastNameLength === 0) return '9999'; // unreal situation, just to prevent an error
        }
    }
    
    let rule6 = () => {
        let year = parseInt(data[3].substring(data[3].length - 4, data[3].length));

        return Math.floor((year / 10) % 10); // math.floor - to pick a minimum value of decade (=mod 10)
    }
    
    let rule7_8 = () => {
        let monthStr = data[3].substring(3, data[3].length - 5);
                
        return data[4] === 'M' ? returnMonthKeyString(monthStr) : parseInt(returnMonthKeyString(monthStr)) + 50;
    }
    
    let rule9_10 = () => { 
        return data[3].substring(0, 2); 
    }

    let rule11 = () => {
        let year = parseInt(data[3].substring(data[3].length - 4, data[3].length));
        return year % 10; // last digit
    }

    let rule12_13 = () => {
        return data[1].length ? (data[0][0] + data[1][0]).toUpperCase() : data[0][0].toUpperCase() + '9';
    };
    
    let rule14 = () => { return '9'};
    
    let rule15_16 = () => { return 'AA'};
    
    // Output string
    return rule1_5() + rule6() + rule7_8() + rule9_10() + rule11() + rule12_13() + rule14() + rule15_16();
  };

module.exports = generate;