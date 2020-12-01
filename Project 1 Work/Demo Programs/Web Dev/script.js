items = document.getElementsByClassName('valueItem');

function set(){
    startValue = Math.trunc(Math.random() * 10) + 1;
    missValue = Math.trunc(Math.random() * 5) + 1;
    step = Math.trunc(Math.random() * 25) + 1;
    items[0].innerHTML = startValue;
    if(Math.random()>=0.5){
        for(i=1; i<items.length; i++){
            items[i].innerHTML = String(parseInt(items[i-1].innerHTML) + step);
        }
    }
    else{
        step = Math.trunc(Math.random() * 3) + 2;
        for(i=1; i<items.length; i++){
            items[i].innerHTML = String(parseInt(items[i-1].innerHTML) * step);
        }
    }
    console.log(missValue)
    answer = items[missValue].innerHTML
    items[missValue].innerHTML = ""
    items[missValue].addEventListener("mouseover", hover);
    items[missValue].addEventListener('click', respond);
}

function hover(){
    items[missValue].style.cursor = "pointer"
}

function respond(){
    response = prompt("Enter the missing value");
      if (answer == response){
          alert("Congratulations - Correct");
          items[missValue].innerHTML = response;
      }else
          alert("Sorry, that is not correct.  Feel free to try again");
};

set()

function reset(){
    set()
};
