const CLIENT_ID = `zfGdlbkp5eeDgh9eLsvCHTIUBLPB-ZBHOPq-bcQ2nx8`;
const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}`;
const slider = document.querySelector(".slider");
let state;
let likes = 0;
const fetchPhotos = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // console.log(data);
            state = data;
            setPhotos();
        }
    } catch (error) {
        console.log(error);
    }
};

const renderImg = () => {
    return `<img src="${state.urls.regular}" class="slider-img" alt="">
    <div class="slider-text">
    <span class="slider-author">Photo by: ${state.user.name}</span>
    <div class="slider-likes">
    <div class="like icon"><svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 13.8599L10.87 10.8C11.0125 10.6416 11.1868 10.5149 11.3815 10.4282C11.5761 10.3415 11.7869 10.2966 12 10.2966C12.2131 10.2966 12.4239 10.3415 12.6185 10.4282C12.8132 10.5149 12.9875 10.6416 13.13 10.8L16 13.8599" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 7.41992L3 17.4199C3 19.6291 4.79086 21.4199 7 21.4199H17C19.2091 21.4199 21 19.6291 21 17.4199V7.41992C21 5.21078 19.2091 3.41992 17 3.41992H7C4.79086 3.41992 3 5.21078 3 7.41992Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
    <span>${likes}</span>
    <div class="dislike icon"><svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 10.99L13.1299 14.05C12.9858 14.2058 12.811 14.3298 12.6166 14.4148C12.4221 14.4998 12.2122 14.5437 12 14.5437C11.7878 14.5437 11.5779 14.4998 11.3834 14.4148C11.189 14.3298 11.0142 14.2058 10.87 14.05L8 10.99" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 17.4199V7.41992C21 5.21078 19.2091 3.41992 17 3.41992L7 3.41992C4.79086 3.41992 3 5.21078 3 7.41992V17.4199C3 19.6291 4.79086 21.4199 7 21.4199H17C19.2091 21.4199 21 19.6291 21 17.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
    </div>
    </div>`;
};

const setPhotos = () => {
    slider.innerHTML = renderImg();
    changeLikes();
};

fetchPhotos();

const changeLikes = () => {
    const likesClickArea = document.querySelector(".slider-likes");
    likesClickArea.addEventListener("click", (e) => {
        if (e.target.parentNode.classList[0] === "like") {
            likes++;
        } else if (
            e.target.parentNode.classList[0] === "dislike" &&
            likes > 0
        ) {
            likes--;
        }
        setPhotos();
    });
};
