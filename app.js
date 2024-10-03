function getTimeString(time) {
    
    const hour  =parseInt(time/3600);
    let remainSecond = time % 3600;
    const minutes = parseInt(remainSecond / 60);
    remainSecond = remainSecond % 60;


    return `${hour} hour ${minutes} minutes ${remainSecond} second`;
}



const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error));
}


const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then(data => displayVideos(data.videos))
    .catch((error) => console.log(error));
}



const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then(data => displayVideos(data.category
    ))
    .catch((error) => console.log(error));
}










// const cardDemo = {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }










const displayVideos = (videos) => {
    const videoContainer  = document.getElementById('videos');
    
    videoContainer.innerHTML = "";

    videos.forEach((video) => {

        console.log(video);

        const card = document.createElement('div');
        card.classList = "card card-compact"
        card.innerHTML = `

    <figure class= "h-[200px] relative">
    <img class= "h-full w-full object-cover"
      src = ${video.thumbnail}
      alt="Shoes" />

      ${
        video.others.posted_date?.length === 0 ? "" : `      <span class="absolute text-xs right-2 bottom-2 bg-black rounded p-2 text-white">${getTimeString(video.others.posted_date)}</span>`
      }


  </figure>
  <div class="px-0 py-2 flex gap-2">

   <div>
        <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" />
   </div>

   
   <div>
        <h2 class="text-[#171717] font-bold">${video.title}</h2>
        <div class= "flex items-center gap-2">
           <p class="text-gray-400 text-[14px"] font-normal>
           ${video.authors[0].profile_name}</p>

           ${video.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ''}

        </div>
        <p></p>
   </div>

   
  </div>

     `;
    videoContainer.append(card); 


    });
}




const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach((item) => {
        
        // create a button

        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button onclick= "loadCategoryVideos(${item.category_id})" class= "btn">${item.category}</button>

        `
 

        // add button

        categoryContainer.append(buttonContainer);

    });
}


loadCategories();
loadVideos();



