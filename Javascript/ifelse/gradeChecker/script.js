let percentage = document.getElementById("number");
let checkBtn = document.getElementById("checkBtn");
let gradeResult = document.getElementById("gradeResult");


let checkGrade = () => {
  let percent = percentage.value
  if (percent == "" || percent <= 0 || percent > 100) {
    gradeResult.innerHTML = "Insaan ke bache bano , Matlab sahi number daalo"
    return
  }
  if (percent > 90) {
    gradeResult.innerHTML = "Wow! You Got A+ Grade"
  } else if (percent >= 80 && percent < 90) {
    gradeResult.innerHTML = "Great! You Got A Grade"
  }
  else if (percent >= 70 && percent < 80) {
    gradeResult.innerHTML = "Good! You Got B Grade"
  }
  else if (percent >= 60 && percent < 70) {
    gradeResult.innerHTML = "Average! You Got C Grade"
  }
  else if (percent >= 50 && percent < 60) {
    gradeResult.innerHTML = "Kanno se bach gae! You got Grade D"
  } else {
    gradeResult.innerHTML = "Gar Jao! Farig Hogae Aap"
  }
  percentage.value = ""
}

checkBtn.addEventListener("click", checkGrade);
