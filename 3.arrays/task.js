function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.every((element, index) => element === arr2[index]);
  }
  
  function getUsersNamesInAgeRange(users, gender) {
    const filteredUsers = users.filter(user => user.gender === gender);
    
    if (filteredUsers.length === 0) {
      return 0;
    }
    
    const ages = filteredUsers.map(user => user.age);
    const totalAge = ages.reduce((sum, age) => sum + age, 0);
    const averageAge = totalAge / filteredUsers.length;
    
    return averageAge;
  }