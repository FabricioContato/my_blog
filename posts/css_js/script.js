function createCard(name, message){
    const div = document.createElement("div");
    const div_flex = document.createElement("div");
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const icon = document.createElement('i');

    div.classList.add("card","card-body","my-1");
    div_flex.classList.add("d-flex");
    icon.classList.add("bi","bi-person-circle", "d-inline");
    h3.textContent = `${name}`;
    h3.classList.add("d-inline","mx-2");
    p.textContent = `${message}`;


    div_flex.appendChild(icon);
    div_flex.appendChild(h3);
    div.appendChild(div_flex);
    div.appendChild(p);

    return div;
}

async function fetchData() {
    const parameters = `?post_id=${document.getElementById("post_id").value}`;
    var response;
    var data;
    try{
        response = await fetch(`https://script.google.com/macros/s/AKfycbzN3qxsiTKoi2sVrRE6QzhTWWp4qYEGzsBpiDtz7U0cfjbkEpP-w16S_r3rL_Fbzl3Q/exec${parameters}`);
        data = await response.json();
    }catch(error){
        document.getElementById("loading_comments").classList.replace("d-block", "d-none");
        document.getElementById("fetching_erro").classList.replace("d-none", "d-block");
        return;
    }


    document.getElementById("loading_comments").classList.replace("d-block", "d-none");

    // Populate the table with fetched data
    const comment_section = document.getElementById('comments');

    data.reverse().forEach(row => {
        comment_section.appendChild(createCard(row.Name, row.Message));
    });
}

window.onload = fetchData;

function isCommentValid(name, comment) {
    const forbidden = /[<>"'\/\\=\(\)\{\}\[\];:@&+%#$`]/;
    return !forbidden.test(name) && !forbidden.test(comment);
  }

(function() {
emailjs.init("NiOdTDAazubFOOdcU");
})();

document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const invalidCommentMessage = document.getElementById("invalidComment");
    if (!invalidCommentMessage.classList.contains("d-none")){
        invalidCommentMessage.classList.replace("d-block", "d-none");
    }

    const erroMessage = document.getElementById("sending_erro");
    if (!erroMessage.classList.contains("d-none")){
        erroMessage.classList.replace("d-block", "d-none");
    }

    const sending = document.getElementById("sending_comment");
    sending.classList.replace("d-none", "d-block");

    const formData = new FormData(this);
    const name = formData.get('name');
    const message = formData.get('message');

    if (!isCommentValid(name, message)){
        sending.classList.replace("d-block", "d-none");
        invalidCommentMessage.classList.replace("d-none", "d-block");
        return;
    }

    emailjs.sendForm('service_eun3jwf', 'template_3n960am', this)
        .then(() => {
        sending.classList.replace("d-block", "d-none");
        document.getElementById('comments').prepend(createCard(name, message));
        this.reset();
        }, (error) => {
        sending.classList.replace("d-block", "d-none");
        erroMessage.classList.replace("d-none", "d-block");
        console.error('❌ FAILED...', error);
        });
});

sessionStorage.setItem('current_carousel_img_index', 0 );
function carousel_limits(carousel_id, direction, number_of_elements){
    //console.log(current_carousel_img_index);
    const carousel = document.getElementById(carousel_id);
    //const active_element = carousel.querySelector('.carousel-item.active');

    const control_prev = carousel.querySelector(".carousel-control-prev");
    const control_next = carousel.querySelector(".carousel-control-next");

    const last_element_index = number_of_elements -1;

    let current_carousel_img_index = sessionStorage.getItem('current_carousel_img_index');

    if(direction === 'left' && current_carousel_img_index === '1'){
        control_prev.disabled = true;
        
    }else if(control_prev.disabled){
        control_prev.disabled = false;
    }
    
    if(direction === 'right' && current_carousel_img_index === String(last_element_index - 1)){
        control_next.disabled = true;

    }else if(control_next.disabled){
        control_next.disabled = false;
    }

    current_carousel_img_index = direction === "left" ?  Number(current_carousel_img_index) - 1 : Number(current_carousel_img_index) + 1;
    sessionStorage.setItem('current_carousel_img_index', current_carousel_img_index);


} 
