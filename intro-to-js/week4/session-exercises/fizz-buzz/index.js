function fizzBuzz(multiple1, multiple2){
  for (let i = 1; i <= 100; i++){
    const isFizz = i % multiple1 == 0;
    const isBuzz = i % multiple2 == 0;
    let result = '';

    if (isFizz){
        result += 'Fizz'; 
    }
    if (isBuzz){
        result += 'Buzz';
    }
    if (result){
        console.log(result);
    }
    else{
        console.log(i);
    }

    // if ((i % multiple1 == 0) && (i % multiple2 == 0)){
    //   console.log("FizzBuzz");
    // }
    // else if (i % multiple1 === 0){
    //   console.log("Fizz");  
    // }
    // else if (i % multiple2 === 0){
    //   console.log("Buzz");  
    // }
    // else {
    //   console.log(i);
    // }
  }
}

const multiple1 = 3;
const multiple2 = 5;

fizzBuzz(multiple1, multiple2);