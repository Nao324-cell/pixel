let DEFAULT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--default-color')
let Flag = false
let CURRENT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--current-color')
let COLOR = ['rgb(128,128,128)','rgb(255,0,0)','rgb(0,128,0)','rgb(0,0,255)','rgb(255,255,0)','rgb(173,216,230)']


document.addEventListener('mousedown', function(){
    Flag = true
})
document.addEventListener('mouseup', function(){
    Flag = false
})

function get_cookie(){
    let cookie = document.cookie.split('; ')
    for(let i = 0; i< cookie.length; i++){
        let cook = cookie[i].split('=')
        if(cook[0] == 'pixel-result'){
            return cook[1] || '0'.repeat(450)
        }
        return '0' * 450
    }
}

setInterval(function() {
    result=''
    let temp = document.querySelectorAll('.cell')
    for(let i = 0; i<temp.length; i++){
        result += temp[i].dataset.color
    }
    document.cookie = `pixel-result=${result};max-age=100000000`
    console.log(document.cookie)
}, 10000)

let field = document.querySelector('.field')
let saved = get_cookie()
if(saved != '0'){
    console.log('```')
    for (let i=0; i<450; i++){
        let  cell = document.createElement('div')
        let nn_color = +saved[i]
        cell.classList.add('cell')
        cell.dataset.color = saved[i]
        cell.style.backgroundColor = COLOR[nn_color]
        field.appendChild(cell)
}} else{ 
    console.log('qqq')
    for (let i=0; i<450; i++){
        let  cell = document.createElement('div')
        cell.classList.add('cell')
        cell.dataset.color = '0'
        cell.style.background = DEFAULT_COLOR
        field.appendChild(cell)
    }
}

let colors = document.querySelectorAll('.color')
for (let i=0; i<colors.length; i++){
    colors[i].addEventListener('click', function(){
        CURRENT_COLOR = getComputedStyle(colors[i]).backgroundColor
        document.documentElement.style.cssText = `--current-color:${CURRENT_COLOR}`
        document.querySelector('.selected').classList.remove('selected')
        colors[i].classList.add('selected')
    })
}

let cells = document.querySelectorAll('.cell')
for (let i=0; i<cells.length; i++){
    cells[i].addEventListener('mouseover', function(){
        if (Flag == true){
            anime({
                targets: cells[i],
                background: CURRENT_COLOR,
                duration:200,
                easing:'linear',
            })
        }
    })
    cells[i].addEventListener('mousedown', function(){  
        anime({
            targets: cells[i],
            background: CURRENT_COLOR,
            duration:200,
            easing:'linear',
        })

    })
}
let save = document.querySelector('.save')
save.addEventListener('click', function(){
    domtoimage.toJpeg(field, { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
})



