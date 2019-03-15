//宣告變數
const colorR = document.getElementById('R-num')
const colorG = document.getElementById('G-num')
const colorB = document.getElementById('B-num')
const convert = document.querySelector('.form-submit')
const hexNumber = document.getElementById('hex-number')
const hexColor = document.getElementById('hex-color')
const list = document.getElementById('rgb-list')

//判斷是否介於0~255或是空值
function isValid(inputField, inputValue) {
    let feedbackDiv = inputField.nextElementSibling.nextElementSibling
    if (isNaN(inputValue) || inputValue === '' || inputValue < 0 || inputValue > 255) {
        inputField.classList.add('is-invalid')
        inputField.nextElementSibling.classList.add('text-danger')
        feedbackDiv.innerHTML = `數字需介於0~255!`
    } else {
        inputField.classList.remove('is-invalid')
        feedbackDiv.innerHTML = ''
        inputField.nextElementSibling.classList.remove('text-danger')
        return
    }  
}

//將rgb轉換為hex
function translateIntoSixteen(r,g,b) {
    let Nr = Number(r).toString(16).toUpperCase()
    let Ng = Number(g).toString(16).toUpperCase()
    let Nb = Number(b).toString(16).toUpperCase()
    let hex 

    // 缺位數補0
    if ( r<16 && g>15 && b>15) {
        hex = 0 + Nr + Ng + Nb
    } else if ( r>15 && g<16 && b>15) {
        hex = Nr + 0 + Ng + Nb
    } else if ( r>15 && g>15 && b<16 ){
        hex = Nr + Ng + 0 + Nb
    } else if ( r<16 && g<16 && b>15){
        hex = 0 + Nr + 0 + Ng + Nb
    } else if ( r<16 && g>15 && b<16 ){  
        hex = 0 + Nr + Ng + 0 +Nb
    } else if ( r>15 && g<16 && b<16 ){    
        hex = Nr + 0 + Ng + 0 + Nb
    } else if ( r<16 && g<16 && b<16 ){
        hex = 0 + Nr + 0 + Ng + 0 + Nb
    } else {
        hex = Nr + Ng + Nb
    }
      
    showHex(hex)
}

//display hex number and color
function showHex(hex) {
    
    hexNumber.innerHTML = hex
    hexColor.innerHTML = `
        <div id="hex" style="background-color: #${hex};">
        </div>
    `
}

function clear() {
    hexNumber.innerHTML = ''
    hexColor.innerHTML = `
        <div id="hex" style="background-color: none;">
        </div>
    `
}

//監聽list的iuput並給予顏色
list.addEventListener('input',function(event) {
    // 取得觸發input事件的元素及該元素的值
    let inputField = event.target
    let inputValue = inputField.value
    isValid(inputField, inputValue)

    colorR.nextElementSibling.innerHTML = `
    <div id="R-color" class="color-box" style="background-color:rgb(${colorR.value}, 0, 0)"></div>
    `
    colorG.nextElementSibling.innerHTML =`
    <div id="G-color" class="color-box" style="background-color:rgb(0, ${colorG.value}, 0)"></div>
    `
    colorB.nextElementSibling.innerHTML = `
    <div id="B-color" class="color-box" style="background-color:rgb(0, 0, ${colorB.value})"></div>
    `
})

//監聽convert鍵
convert.addEventListener("click", function(){
    clear() //清除hex值
    let r = colorR.value
    let g = colorG.value
    let b = colorB.value

    // 如果input不符合規格就跳出警告
    if (isNaN(r) || r === '' || r < 0 || r > 255 ||
    isNaN(g) || g === '' || g < 0 || g > 255 ||
    isNaN(b) || b === '' || b < 0 || b > 255 ) {
        alert('數字需介於0~255!')
    } else {
        translateIntoSixteen(r,g,b)
    }
})
