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
    const response = await fetch(`https://script.google.com/macros/s/AKfycbzN3qxsiTKoi2sVrRE6QzhTWWp4qYEGzsBpiDtz7U0cfjbkEpP-w16S_r3rL_Fbzl3Q/exec${parameters}`);
    const data = await response.json();

    document.getElementById("loading_comments").classList.add("d-none");

    // Populate the table with fetched data
    const comment_section = document.getElementById('comments');

    data.reverse().forEach(row => {
        comment_section.appendChild(createCard(row.Name, row.Message));
    });
}

window.onload = fetchData;

(function() {
emailjs.init("NiOdTDAazubFOOdcU");
})();

document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const sending = document.getElementById("sending_comment");
    sending.classList.remove("d-none");

    emailjs.sendForm('service_eun3jwf', 'template_3n960am', this)
        .then(() => {
        sending.classList.add("d-none");
        const formData = new FormData(this);
        const name = formData.get('name');
        const message = formData.get('message');
        document.getElementById('comments').prepend(createCard(name, message));
        this.reset();
        }, (error) => {
        sending.classList.add("d-none");
        console.error('❌ FAILED...', error);
        alert('❌ Something went wrong. Please try again.');
        });
});

function carousel_limits(carousel_id, direction, number_of_elements){
    const carousel = document.getElementById(carousel_id);
    const active_element = carousel.querySelector('.carousel-item.active');

    const control_prev = carousel.querySelector(".carousel-control-prev");
    const control_next = carousel.querySelector(".carousel-control-next");

    const last_element_index = number_of_elements -1;


    if(direction === 'left' && active_element.id === "1"){
        control_prev.disabled = true;
        
    }else if(control_prev.disabled){
        control_prev.disabled = false;
    }
    
    if(direction === 'right' && active_element.id === String(last_element_index - 1)){
        control_next.disabled = true;

    }else if(control_next.disabled){
        control_next.disabled = false;
    }


} 
